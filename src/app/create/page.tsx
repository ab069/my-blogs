"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/slices/blogSlice";
  // Redux action for adding a post
import { BlogPost } from "@/types/blog";
import { v4 as uuidv4 } from "uuid";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) return alert("All fields are required");

    const newPost: BlogPost = {
      id: uuidv4(), // Unique post ID
      title,
      description,
      content,
      tags: tags ? tags.split(",") : [],
      createdAt: new Date().toISOString(),
    };

    // Dispatch the action to Redux store
    dispatch(addPost(newPost));

    // Redirect to the homepage after saving the post
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-semibold">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            rows={6}
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block font-semibold">Tags (optional, comma separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Save Post
        </button>
      </form>
    </div>
  );
}
