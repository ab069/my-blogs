"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePost } from "@/lib/storage";
import { BlogPost } from "@/types/blog";
import { v4 as uuidv4 } from "uuid";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !content) return alert("All fields are required");

    const newPost: BlogPost = {
      id: uuidv4(),
      title,
      description,
      content,
      tags: tags.split(",").map(tag => tag.trim()),
      createdAt: new Date().toISOString(),
    };

    savePost(newPost);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Create New Post</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded-md"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create Post
        </button>
      </form>
    </div>
  );
}
