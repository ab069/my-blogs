"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { setPosts, deletePost } from "../lib/features/blogSlice";

import Link from "next/link";

export default function Home() {
  const posts = useSelector((state: RootState) => state.blog.posts);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 My Blog</h1>
      <Link href="/create">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Create New Post</button>
      </Link>

      {posts.length === 0 ? (
        <p className="text-gray-600 mt-4">No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>
              <div className="flex justify-between items-center mt-2">
                <Link href={`/post/${post.id}`}>
                  <button className="text-blue-500">Read More</button>
                </Link>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
