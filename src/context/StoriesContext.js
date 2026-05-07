"use client";

import { createContext, useCallback, useContext, useState } from "react";

const StoriesContext = createContext(null);

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([]);

  const addStory = useCallback((story) => {
    const newStory = {
      ...story,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setStories((prev) => [newStory, ...prev]);
    return newStory;
  }, []);

  const removeStory = useCallback((id) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearStories = useCallback(() => setStories([]), []);

  return (
    <StoriesContext.Provider value={{ stories, addStory, removeStory, clearStories }}>
      {children}
    </StoriesContext.Provider>
  );
}

export function useStories() {
  const context = useContext(StoriesContext);
  if (!context) {
    throw new Error("useStories must be used within a StoriesProvider");
  }
  return context;
}