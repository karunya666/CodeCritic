const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const reviewCode = async (code) => {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Analyze this code and return ONLY a valid JSON object. No markdown, no backticks, no extra text. Just raw JSON.

The JSON must follow this exact shape:
{
  "language": "detected programming language name in lowercase (e.g. javascript, python, java, cpp, go, rust, etc.)",
  "title": "a short 4-6 word title describing what this code does",
  "errors": [
    {
      "line": <line number as integer or null if unknown>,
      "message": "clear description of the error",
      "severity": "error or warning"
    }
  ],
  "improvements": [
    {
      "message": "clear description of the improvement",
      "category": "performance or readability or security or best-practice"
    }
  ],
  "timeComplexity": "Big-O notation with brief explanation e.g. O(n²) - two nested loops",
  "spaceComplexity": "Big-O notation with brief explanation e.g. O(1) - in-place sorting",
  "explanation": "2-3 sentence overall summary of the code quality and key takeaways"
}

If there are no errors, return an empty array for errors. Same for improvements.

Code to analyze:
\`\`\`
${code}
\`\`\``,
      },
    ],
  });

  const raw = response.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("")
    .trim();

  const clean = raw.replace(/```json|```/g, "").trim();

  const parsed = JSON.parse(clean);

  return parsed;
};

module.exports = { reviewCode };