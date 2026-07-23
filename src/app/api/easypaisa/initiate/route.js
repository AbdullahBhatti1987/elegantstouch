import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, orderRefNum } = body;

    const storeId = process.env.EASYPAY_STORE_ID;
    const hashKey = process.env.EASYPAY_HASH_KEY;
    const postBackURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/easypaisa/response`;

    // Format expiration date (e.g., 5 minutes from now: YYYYMMDD HHmmss)
    const now = new Date(Date.now() + 5 * 60 * 1000);
    const tokenExpiry =
      now.toISOString().slice(0, 10).replace(/-/g, '') +
      ' ' +
      now.toTimeString().slice(0, 8).replace(/:/g, '');

    // Parameters required by Easypaisa
    const params = {
      amount: amount,
      autoRedirect: '1',
      bankIdentificationNumber: '',
      emailAddress: 'customer@example.com',
      orderRefNum: orderRefNum,
      paymentMethod: 'easypaisa',
      postBackURL: postBackURL,
      storeId: storeId,
      tokenExpiry: tokenExpiry,
      transactionType: 'InitialRequest',
    };

    // 1. Sort parameters alphabetically by key and create an attribute string
    // Easypaisa requires specific formatting for hashing string payload mapping
    const sortedKeys = Object.keys(params).sort();
    let hashString = '';
    sortedKeys.forEach((key) => {
      if (params[key] !== '') {
        hashString += `${key}=${params[key]}&`;
      }
    });
    // Remove trailing ampersand and append hash key
    hashString = hashString.slice(0, -1) + hashKey;

    // 2. Generate HMAC-SHA256 or specific encrypted hash depending on your exact Easypaisa contract
    // (Standard implementation uses crypto to generate the hashed string signature)
    const encryptedHashRequest = crypto
      .createHmac('sha256', hashKey)
      .update(hashString)
      .digest('hex'); // Note: Some legacy Easypaisa gateways use tripledes/aes, check your specific merchant portal spec sheet.

    params.encryptedHashRequest = encryptedHashRequest;

    return NextResponse.json({
      success: true,
      easypayURL: process.env.EASYPAY_CHECKOUT_URL,
      params,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
