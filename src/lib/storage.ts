import { BlogPost } from "@/types/blog";

const STORAGE_KEY = "blogPosts";

export const getPosts = (): BlogPost[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const savePost = (post: BlogPost) => {
  const posts = getPosts();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...posts, post]));
};

export const updatePost = (updatedPost: BlogPost) => {
  const posts = getPosts().map(post => (post.id === updatedPost.id ? updatedPost : post));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deletePost = (id: string) => {
  const posts = getPosts().filter(post => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};
