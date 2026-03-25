const { GoogleGenAI } = require("@google/genai");

const SYSTEM_INSTRUCTION = `You are an intelligent, agentic AI learning assistant for "AI Course Studio" — a platform that generates university-grade courses on any topic using AI.

Your capabilities:
- Explain any concept in depth, from beginner to advanced level
- Suggest learning paths and course topics the user can generate on the platform
- Answer follow-up questions with full conversational context
- Provide code examples, analogies, and step-by-step breakdowns when helpful
- Help debug code or clarify technical concepts
- Motivate and guide learners

Behavior guidelines:
- Be concise but thorough. Use markdown formatting (bold, lists, code blocks) for clarity.
- When a user asks about a broad topic, suggest they generate a full course on the platform for a structured deep-dive.
- Always be encouraging and supportive of the learner's journey.
- If you don't know something, say so honestly.
- Keep responses focused and actionable.`;

exports.chat = async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ message: "message is required" });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Build the conversation contents array for multi-turn chat
    const contents = [];

    // Add conversation history if provided
    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }],
          });
        }
      }
    }

    // Add the current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response. Please try again.";

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
