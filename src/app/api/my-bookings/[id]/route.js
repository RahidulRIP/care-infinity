import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // console.log(id);

    const client = await clientPromise;
    const db = client.db("care_infinity");
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("bookings").deleteOne(query);
    return NextResponse.json({ message: "Deleted Successfully", result });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const client = await clientPromise;
    const db = await client.db("care_infinity");
    const query = { _id: new ObjectId(id) };
    const options = {
      $set: {
        duration: Number(body.duration),
        totalCost: Number(body.totalCost),
        "location.district": body.district,
        "location.city": body.city,
      },
    };
    const result = await db.collection("bookings").updateOne(query, options);

    return NextResponse.json({ message: "Updated", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

export const GET = async (request, { params }) => {
  const { id } = await params;
  const client = await clientPromise;
  const db = client.db("care_infinity");
  const query = { _id: new ObjectId(id) };
  try {
    const res = await db.collection("bookings").findOne(query);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
