const GENRE_PROMPTS = {
  Horror: "eerie, suspenseful, and age-appropriately spooky",
  Comedy: "funny, silly, and full of humor",
  Folklore: "rich in culture, tradition, and moral lessons",
  Action: "exciting, fast-paced, and adventurous",
};

export async function POST(request) {
  try {
    const { description, genre } = await request.json();

    if (!description || description.trim().length === 0) {
      return Response.json(
        { error: "Story description is required." },
        { status: 400 }
      );
    }

    const hasGenre = genre && genre !== "none";
    const genreStyle = hasGenre ? GENRE_PROMPTS[genre] : null;

    const systemPrompt = hasGenre
      ? `You are a children's story writer. Write a vivid, engaging story of 250-350 words 
         for children aged 5-10. The story must be ${genreStyle}. 
         Respond with ONLY valid JSON, no markdown, no code fences, no explanation:
         {"title":"...","story":"...","genre":"${genre}","wordCount":0}`
      : `You are a children's story writer and genre classifier. 
         Read the story description, determine the best genre from exactly: Horror, Comedy, Folklore, Action.
         Then write a vivid engaging story of 250-350 words for children aged 5-10 that fits that genre perfectly.
         Respond with ONLY valid JSON, no markdown, no code fences, no explanation:
         {"title":"...","story":"...","genre":"...","wordCount":0}`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://storymind.app",
          "X-Title": "StoryMind",
        },
        body: JSON.stringify({
          model: "auto",
          models: [
            "mistralai/mistral-nemo",
            "google/gemini-flash-1.5",
            "meta-llama/llama-3.1-8b-instruct",
          ],
          route: "fallback",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Write a children's story about: ${description.trim()}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter error:", errorData);
      return Response.json(
        { error: "AI service error. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const modelUsed = data.model || "auto";
    const rawContent = data.choices?.[0]?.message?.content;

    if (!rawContent) {
      return Response.json(
        { error: "No response from AI. Please try again." },
        { status: 502 }
      );
    }

    let parsed;
    try {
      const cleaned = rawContent
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsed = JSON.parse(cleaned);
    } catch {
      return Response.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({
      title: parsed.title,
      story: parsed.story,
      genre: parsed.genre,
      wordCount: parsed.story.split(" ").length,
      modelUsed,
    });
  } catch (error) {
    console.error("Generate story error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}