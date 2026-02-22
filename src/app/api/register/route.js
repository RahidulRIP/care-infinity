import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { name, email, password, nid, contact } = await request.json();

    const client = await clientPromise;
    const db = client.db("care_infinity");
    const dbUsers = db.collection("users");

    const existingUser = await dbUsers.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exits" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await dbUsers.insertOne({
      name,
      email,
      password: hashedPassword,
      nid,
      contact,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 201 },
    );
  } catch (error) {
    // console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
