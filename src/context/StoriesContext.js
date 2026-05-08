"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const StoriesContext = createContext(null);

const STORAGE_KEY = "storymind:stories";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(stories) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  } catch {
    console.warn("Could not save stories to localStorage.");
  }
}

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setStories(loadFromStorage());
    setHydrated(true);
  }, []);

  // Save to localStorage whenever stories change
  useEffect(() => {
    if (hydrated) {
      saveToStorage(stories);
    }
  }, [stories, hydrated]);

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

  const clearStories = useCallback(() => {
    setStories([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <StoriesContext.Provider value={{ stories, addStory, removeStory, clearStories, hydrated }}>
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