"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setPost({
          id: data.id,
          title: data.title,
          description: data.body,
          imageUrl: "https://picsum.photos/300",
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold">{post.title}</h2>
      <Image className="w-full h-60 object-cover my-4" src={post.imageUrl} alt="Post Image" />
      <p className="text-gray-700">{post.description}</p>
    </div>
  );
};

export default PostDetail;
