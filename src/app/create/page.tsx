"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../lib/features/blogSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setImage(file);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !content || !image) {
      return alert("All fields are required, including an image.");
    }
  
    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        const fileName = `${Date.now()}-${image.name}`;
        const fileContent = reader.result;
  
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName, fileContent }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to upload image.");
        }
  
        const { url } = await response.json();
  
        dispatch(
          addPost({
            id: Date.now().toString(),
            title,
            description,
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            image: url,
            createdAt: new Date().toISOString(),
          })
        );
  
        router.push("/");
      };
    } catch (err) {
      alert("Error uploading image.");
      console.error(err);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />

        {preview && (
          <Image
            src={preview}
            width={300}
            height={200}
            alt="Preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Post
        </button>
      </form>
    </div>
  );
}
