"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/store"; // Assuming RootState is set up
import { BlogPost } from "@/types/blog";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component from Next.js

export default function ViewPost() {
  const { id } = useParams();
  const post = useSelector((state: RootState) =>
    state.blog.posts.find((post) => post.id === id)
  );

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.description}</p>
      {post.image && (
        <div className="mt-4">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="mt-4">{post.content}</div>
      {post.tags && (
      <p className="mt-4 text-gray-500"> Tags : {post.tags?.join(", ")}</p> )}
    </div>
  );
}
