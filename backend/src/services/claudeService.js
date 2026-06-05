const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const reviewCode = async (code) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content: `You are an expert code reviewer who supports all programming languages. 
You always respond with ONLY a valid JSON object. No markdown, no backticks, no extra text. Just raw JSON.`,
      },
      {
        role: "user",
        content: `Analyze this code and return ONLY a valid JSON object with this exact shape:
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

If there are no errors return an empty array. Same for improvements.

Code to analyze:
\`\`\`
${code}
\`\`\``,
      },
    ],
  });

  const raw = response.choices[0].message.content.trim();
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return parsed;
};

module.exports = { reviewCode };