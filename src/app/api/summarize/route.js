export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return Response.json(
        { error: "Text to summarize is required." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a concise text summarizer. Summarize the given text in 3-5 clear, informative sentences.
Capture the key points and main ideas. Respond with ONLY valid JSON, no markdown, no code fences, no explanation:
{"summary":"...","originalWordCount":0,"summaryWordCount":0}`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://ifeanyi-talesai.netlify.app",
          "X-Title": "TalesAI",
        },
        body: JSON.stringify({
          model: "auto",
          models: [
            "google/gemini-flash-1.5",
            "meta-llama/llama-3.1-8b-instruct",
            "mistralai/mistral-nemo",
          ],
          route: "fallback",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text.trim() },
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
      console.error("Raw AI response:", rawContent);
      return Response.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({
      summary: parsed.summary,
      originalWordCount: parsed.originalWordCount,
      summaryWordCount: parsed.summaryWordCount,
    });
  } catch (error) {
    console.error("Summarize error:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
