"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiBook } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import { useStories } from "@/context/StoriesContext";
import StoryCard from "@/components/StoryCard";
import StoryModal from "@/components/StoryModal";

const GENRES = ["All", "Horror", "Comedy", "Folklore", "Action"];

const GENRE_COLORS = {
  Horror: "bg-error/10 text-error border-error/30",
  Comedy: "bg-warning/10 text-warning border-warning/30",
  Folklore: "bg-primary/10 text-primary border-primary/30",
  Action: "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/30",
};

export default function StoryBrowserPage() {
  const { stories } = useStories();
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedStory, setSelectedStory] = useState(null);

  const filtered =
    activeGenre === "All"
      ? stories
      : stories.filter((s) => s.genre === activeGenre);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Children's Stories
          </h1>
          <p className="text-muted-foreground text-sm">
            AI-generated stories routed intelligently by Franklin Smart Router
          </p>
        </div>

        {/* Genre Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                activeGenre === genre
                  ? "bg-brand text-white border-brand"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Story Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
              <FiBook size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">
                No stories yet
              </p>
              <p className="text-sm text-muted-foreground">
                Head to Generate Story to create your first one
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
            >
              Generate a Story <FiArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                genreColors={GENRE_COLORS}
                onClick={() => setSelectedStory(story)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          genreColors={GENRE_COLORS}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </main>
  );
}