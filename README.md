CodeCritic: AI-Powered Code Review Platform

Live Demo: https://code-critic-six.vercel.app

CodeCritic is a full-stack AI-powered code review platform designed to help developers write cleaner, faster, and more reliable code. The platform leverages Groq's LLaMA 3.3 70B model to perform intelligent code analysis, detect bugs, identify performance bottlenecks, suggest improvements, and calculate time and space complexity across multiple programming languages.

Built with a modern React frontend, Monaco Editor integration, Clerk authentication, and MongoDB-powered session management, CodeCritic provides an experience similar to having a senior engineer review your code instantly.

🚀 Key Features
🧠 AI-Powered Code Review
Analyze code snippets using LLaMA 3.3 70B via Groq API.
Detect syntax errors, logic bugs, runtime issues, and edge cases.
Receive structured feedback with exact problem descriptions.
Get complexity analysis including time and space complexity.
⚡ AI Code Optimization
One-click code optimization.
Automatically fixes bugs and edge cases.
Improves performance and readability.
Generates production-ready optimized code.
Compare complexity before and after optimization.
💻 Professional Code Editor
Monaco Editor integration (same editor powering VS Code).
Syntax highlighting for multiple programming languages.
Real-time editing experience.
Automatic language detection.
📚 Session History
Automatically save every code review.
Browse previous review sessions.
Reload and inspect past code reviews.
Delete unwanted sessions.
🌐 Multi-Language Support

Supports all major programming languages including:

C++
Java
Python
JavaScript
TypeScript
Go
Rust
C#
PHP
Ruby
Swift
Kotlin
And many more.
🔐 Secure Authentication
Clerk-based authentication.
Email/password login.
Google OAuth.
GitHub OAuth.
Protected routes and secure API access.
👤 Profile Management
Update profile information.
Upload custom avatars.
Change passwords securely.
Account management tools.
🎨 Modern Developer Experience
Kinetic Noir design system.
Dark premium SaaS aesthetic.
Responsive UI.
Fast and intuitive workflow.
🛠️ Tech Stack
Frontend
React 19
Vite
Tailwind CSS
React Router
Monaco Editor
Axios
Clerk React
React Icons
DevIcons React
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
Clerk SDK
Groq SDK
Helmet
CORS
Morgan
Svix Webhooks
AI Integration
Groq API
LLaMA 3.3 70B Versatile
AI Code Review
AI Code Optimization
Language Detection
Complexity Analysis
Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
🏗️ Getting Started
Prerequisites

Before running the project, ensure you have:

Node.js installed
MongoDB Atlas account
Clerk account
Groq API key
⚙️ Installation
1. Clone the Repository
git clone https://github.com/karunya666/CodeCritic.git
2. Install Backend Dependencies
cd backend
npm install
3. Install Frontend Dependencies
cd frontend
npm install
4. Run Backend
cd backend
npm run dev
5. Run Frontend
cd frontend
npm run dev
🔑 Environment Configuration
Backend .env
MONGODB_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key

CLERK_SECRET_KEY=your_clerk_secret_key

CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

CLIENT_URL=http://localhost:5173

PORT=5000

NODE_ENV=development
Frontend .env
VITE_API_URL=http://localhost:5000/api

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
🌐 API Overview
Route	Description
POST /api/review	Analyze code and generate review
POST /api/review/optimise	Generate optimized version of code
POST /api/review/detect	Detect programming language
PATCH /api/review/:id	Update existing review session
GET /api/sessions	Retrieve user review history
GET /api/sessions/:id	Fetch specific review session
DELETE /api/sessions/:id	Delete review session
POST /api/webhooks/clerk	Clerk user synchronization webhook
🔄 Platform Workflow
AI Code Review Workflow
User writes or pastes code into the Monaco Editor.
Code is sent to the backend for analysis.
Groq's LLaMA 3.3 70B model reviews the code.
AI identifies:
Errors
Improvements
Complexity Analysis
Results are displayed in a structured review panel.
Review session is automatically stored in MongoDB.
AI Optimization Workflow
User clicks Optimize Code.
AI rewrites the code using best practices.
Bugs and inefficiencies are removed.
Optimized code replaces the original code.
Code is automatically re-analyzed.
Complexity comparison is displayed.
🏛️ System Architecture
User Browser
      │
      ▼
React + Vite Frontend
      │
      ▼
Express.js Backend
      │
 ┌────┴────┐
 ▼         ▼
Groq AI   MongoDB Atlas
 API
      │
      ▼
Clerk Authentication
🚀 Deployment
Frontend

https://code-critic-six.vercel.app

Backend

https://codecritic-ydsh.onrender.com

Database

MongoDB Atlas

🎯 Future Enhancements
Algorithm Visualizer.
Code execution support.
Public shareable review links.
Export reviews as PDF.
GitHub integration.
VS Code extension.
Team collaboration features.
Review analytics dashboard.
AI-generated coding interview feedback.
Rate limiting and advanced monitoring.
Dark/Light theme switching.
Migration to TypeScript.
👨‍💻 Author

Karunya

Built for developers who want instant, AI-powered code reviews, cleaner code, better performance, and a faster development workflow. 🚀
