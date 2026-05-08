"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX, FiCpu } from "react-icons/fi";

export default function StoryModal({ story, genreColors, onClose }) {
    const [mounted, setMounted] = useState(false);
  const badgeClass =
    genreColors[story.genre] || "bg-gray-800 text-gray-300 border-gray-700";


    useEffect(() => {
    setMounted(true);
}, []);


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-surface border border-border rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex flex-col gap-2">
            <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}>
              {story.genre}
            </span>
            <h2 className="text-lg font-bold text-foreground leading-snug">
              {story.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors ml-4 shrink-0"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Story Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
            {story.story}
          </p>
        </div>

        {/* Footer — Smart Routing Badge */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {story.wordCount} words
          </span>
          {story.modelUsed && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand bg-brand/10 px-3 py-1 rounded-full border border-brand/20">
              <FiCpu size={11} />
              {story.modelUsed}
            </span>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}