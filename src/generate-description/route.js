// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { NextResponse } from 'next/server';

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

// export async function POST(request) {
//   try {
//     const { name } = await request.json();

//     const model = genAI.getGenerativeModel({
//       //   model:"gemini-2.0-flash"

//     //   model: 'gemini-2.5-flash',

//      model: "gemini-2.5-flash-lite"
//     });

//     const result = await model.generateContent(
//       `
// Create ecommerce product content.

// Product name:
// ${name}

// Return JSON:
// {
//  shortDescription:"",
//  description:"",
//  features:[],
//  seoTitle:"",
//  seoDescription:"",
//  keywords:[],
//  tags:[]
// }
// `,
//     );

//     const text = result.response.text();

//     return NextResponse.json({
//       success: true,
//       content: JSON.parse(text),
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// }
