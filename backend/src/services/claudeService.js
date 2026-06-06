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
        content: `You are a ruthless but helpful code reviewer. You catch every issue — syntax errors, logic bugs, edge cases, security flaws, and performance problems. You never skip issues. If the input is not valid code or is gibberish, return a JSON response where explanation says something natural like "That doesn't look like code to me. Try pasting a real code snippet!" and leave all other arrays empty and complexities as "N/A". You always respond with ONLY a valid JSON object. No markdown, no backticks, no extra text. Just raw JSON.`,
      },
      {
        role: "user",
        content: `Analyze this code thoroughly and return ONLY a valid JSON object with this exact shape:
{
  "language": "detected programming language name in lowercase",
  "title": "a short 4-6 word title describing what this code does",
  "errors": [
    {
      "line": <line number as integer or null if unknown>,
      "message": "specific description of the exact error — syntax error, logic bug, runtime error, edge case, etc.",
      "severity": "error or warning"
    }
  ],
  "improvements": [
    {
      "message": "specific actionable improvement — include corrections for all errors found, better time/space complexity suggestions, readability fixes, security improvements, best practices",
      "category": "performance or readability or security or best-practice"
    }
  ],
  "timeComplexity": "Big-O notation with brief explanation e.g. O(n²) - two nested loops",
  "spaceComplexity": "Big-O notation with brief explanation e.g. O(1) - in-place sorting",
  "explanation": "2-3 sentence overall summary of the code quality and key takeaways"
}

Rules:
- Catch ALL syntax errors with exact line numbers
- Catch ALL logic errors and edge cases
- In improvements, include fixes for every error found
- In improvements, always suggest better complexity if possible
- If code is already optimal say so in explanation
- If no errors, return empty array for errors
- If no improvements needed, return empty array for improvements

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

const optimiseCode = async (code) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content: `You are an expert software engineer. When given code, you rewrite it to be fully optimised — best possible time complexity, best possible space complexity, clean readable code, all bugs fixed, all edge cases handled. You return ONLY the raw optimised code. No explanations, no markdown, no backticks, no comments about what changed. Just the clean optimised code itself.`,
      },
      {
        role: "user",
        content: `Fully optimise this code. Fix all bugs, improve time and space complexity to the best possible, handle edge cases, clean up the code. Return ONLY the optimised code, nothing else:

${code}`,
      },
    ],
  });

  const optimisedCode = response.choices[0].message.content.trim();
  return optimisedCode;
};

const detectLanguage = async (code) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 10,
    messages: [
      {
        role: "system",
        content: "You are a language detector. Reply with ONLY the language name in lowercase. One word only. Examples: javascript, python, cpp, java, go, rust, typescript, ruby, php, swift, kotlin, csharp, plaintext",
      },
      {
        role: "user",
        content: `What programming language is this?\n\n${code.slice(0, 500)}`,
      },
    ],
  });
  return response.choices[0].message.content.trim().toLowerCase()
}

module.exports = { reviewCode, optimiseCode, detectLanguage };