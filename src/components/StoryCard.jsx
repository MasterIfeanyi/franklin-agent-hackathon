import { FiClock } from "react-icons/fi";

const GENRE_GRADIENTS = {
  Horror: "from-red-950 to-red-900",
  Comedy: "from-yellow-950 to-yellow-900",
  Folklore: "from-green-950 to-green-900",
  Action: "from-orange-950 to-orange-900",
};

const GENRE_EMOJIS = {
  Horror: "👻",
  Comedy: "😂",
  Folklore: "🌿",
  Action: "⚡",
};

export default function StoryCard({ story, genreColors, onClick }) {
  const gradient = GENRE_GRADIENTS[story.genre] || "from-gray-900 to-gray-800";
  const emoji = GENRE_EMOJIS[story.genre] || "📖";
  const badgeClass = genreColors[story.genre] || "bg-gray-800 text-gray-300 border-gray-700";

  return (
    <button
      onClick={onClick}
      className="group text-left bg-surface border border-border rounded-lg overflow-hidden hover:border-brand/40 hover:shadow-card transition-all duration-300 w-full"
    >
      {/* Thumbnail */}
      <div className={`h-28 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeClass}`}>
          {story.genre}
        </span>
        <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2">
          {story.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-auto">
          <FiClock size={11} />
          <span>{story.wordCount} words</span>
        </div>
      </div>
    </button>
  );
}