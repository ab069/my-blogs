import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "@/types/blog";

interface BlogState {
  posts: BlogPost[];
}

const initialState: BlogState = {
  posts: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
    

  },
});

export const { addPost, updatePost, deletePost, setPosts } = blogSlice.actions;
export default blogSlice.reducer;
