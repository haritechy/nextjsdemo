import { NextResponse } from "next/server";
import Post from "../models/posts";
import connectToDatabase from "../lib/mongodb";

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find({});
  return NextResponse.json(posts);
}

export async function POST(req) {
  await connectToDatabase();
  const { Name, Email, Address, Phno } = await req.json();

  if (!Name || !Email) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const newPost = new Post({ Name, Email, Address, Phno });
  await newPost.save();

  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(req) {
  await connectToDatabase();
  const { _id, Name, Email, Address, Phno } = await req.json();

  if (!_id || !Name || !Email) {
    return NextResponse.json({ error: "ID, Name, and Email are required" }, { status: 400 });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { Name, Email, Address, Phno },
      { new: true } 
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);  // Logging the error to fix lint warning
    return NextResponse.json({ error: "An error occurred while updating the post" }, { status: 500 });
  }
}
