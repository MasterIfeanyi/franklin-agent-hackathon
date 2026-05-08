"use client";

import { useState } from "react";
import { FiCpu, FiSave, FiRefreshCw } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import { useStories } from "@/context/StoriesContext";
import Button from "@/components/ui/Button";

const GENRES = ["Horror", "Comedy", "Folklore", "Action"];

const GENRE_COLORS = {
  Horror: "bg-red-950 text-red-300 border-red-800",
  Comedy: "bg-yellow-950 text-yellow-300 border-yellow-800",
  Folklore: "bg-green-950 text-green-300 border-green-800",
  Action: "bg-orange-950 text-orange-300 border-orange-800",
};

export default function GenerateStoryPage() {
  const { addStory } = useStories();
  const [description, setDescription] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  async function handleGenerate() {
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          genre: selectedGenre,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSave() {
    if (!result) return;
    addStory(result);
    setSaved(true);
  }

  function handleReset() {
    setDescription("");
    setSelectedGenre(null);
    setResult(null);
    setError(null);
    setSaved(false);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Generate a Story
          </h1>
          <p className="text-muted-foreground text-sm">
            Describe your idea — our AI writes it and detects its genre
            automatically
          </p>
        </div>

        {/* Form */}
        {!result && (
          <div className="flex flex-col gap-6">
            {/* Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground">
                Your story idea
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. A tiny elephant afraid of water discovers a hidden waterfall in the heart of Lagos..."
                rows={10}
                disabled={loading}
                className="w-full px-4 py-3 bg-surface border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground text-right">
                {description.length} characters
              </p>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-foreground">
                Choose a genre{" "}
                <span className="text-muted-foreground font-normal">
                  — or leave blank for AI to decide
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() =>
                      setSelectedGenre(
                        selectedGenre === genre ? null : genre
                      )
                    }
                    disabled={loading}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all disabled:opacity-50 ${
                      selectedGenre === genre
                        ? "bg-brand text-white border-brand"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              {!selectedGenre && (
                <p className="text-xs text-muted-foreground">
                  No genre selected — AI will detect the best fit
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-destructive/10 border border-destructive/30 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!description.trim() || loading}
              loading={loading}
              variant="primary"
              size="large"
              className="rounded-md"
            >
              {loading ? "Crafting your story..." : "Generate Story"}
            </Button>

            {loading && (
              <p className="text-xs text-center text-muted-foreground animate-pulse">
                AI is writing your story and detecting its genre...
              </p>
            )}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="flex flex-col gap-6">
            {/* Story Card */}
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              {/* Card Header */}
              <div className="p-6 border-b border-border flex flex-col gap-3">
                <span
                  className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    GENRE_COLORS[result.genre] ||
                    "bg-gray-800 text-gray-300 border-gray-700"
                  }`}
                >
                  {result.genre}
                </span>
                <h2 className="text-xl font-bold text-foreground">
                  {result.title}
                </h2>
                {/* Smart Routing Badge */}
                {result.modelUsed && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20 w-fit">
                    <FiCpu size={11} />
                    Routed to: {result.modelUsed}
                  </span>
                )}
              </div>

              {/* Story Body */}
              <div className="p-6">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {result.story}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {result.wordCount} words
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSave}
                disabled={saved}
                variant="primary"
                size="medium"
                icon={<FiSave size={15} />}
                className="rounded-md flex-1"
              >
                {saved ? "Saved to Stories!" : "Save to My Stories"}
              </Button>
              <Button
                onClick={handleReset}
                variant="neutral"
                size="medium"
                icon={<FiRefreshCw size={15} />}
                className="rounded-md flex-1"
              >
                Generate Another
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}