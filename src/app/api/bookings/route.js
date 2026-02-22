import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";
import invoiceTemplate from "@/lib/invoiceTemplate";

// export async function POST(request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json(
//         { message: "Unauthorized! Please login first" },
//         { status: 401 },
//       );
//     }
//     const bookingData = await request.json();
//     console.log(bookingData);

//     const client = await clientPromise;

//     const db = client.db("care_infinity");
//     const bookingCollection = db.collection("bookings");

//     const result = await bookingCollection.insertOne({
//       ...bookingData,
//       userEmail: session?.user?.email,
//       createdAt: new Date(),
//     });

//     return NextResponse.json(
//       {
//         message: "Booking Confirmed",
//         result,
//       },
//       {
//         status: 201,
//       },
//     );
//   } catch (error) {
//     console.error("Booking Error", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized! Please login first" },
        { status: 401 },
      );
    }
    const bookingData = await request.json();
    // console.log(bookingData);

    const client = await clientPromise;

    const db = client.db("care_infinity");
    const bookingCollection = db.collection("bookings");

    const result = await bookingCollection.insertOne({
      ...bookingData,
      userEmail: session?.user?.email,
      createdAt: new Date(),
    });

    if (result.insertedId) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Care.Infinity" <${process.env.EMAIL_USER}>`,
          to: session?.user?.email,
          subject: `Confirmation: Booking for ${bookingData?.serviceTitle}`,
          html: invoiceTemplate({
            ...bookingData,
            _id: result.insertedId,
            userEmail: session?.user?.email,
          }),
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } catch (emailError) {
        console.error("Email Sending Failed:", emailError);
      }
    }

    return NextResponse.json(
      {
        message: "Booking Confirmed",
        result,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Booking Error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
