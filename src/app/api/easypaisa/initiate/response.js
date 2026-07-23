export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Pages router mein formData ke bajaye req.body ya URLSearchParams use hotay hain
    const { paymentStatus, orderRefNum } = req.body;

    if (paymentStatus === '0000') {
      // Success: Redirect user to success page
      return res.redirect(
        303,
        `/checkout/success?order=${orderRefNum}`,
      );
    } else {
      // Failed or cancelled
      return res.redirect(
        303,
        `/checkout/failed?order=${orderRefNum}`,
      );
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
