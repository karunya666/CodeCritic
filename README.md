# CodeCritic: AI-Powered Code Review Platform

![CodeCritic Home Page](https://github.com/user-attachments/assets/cf32b34f-86af-40d0-b8cb-c12bba4e6c18)

**Live Demo:** https://code-critic-six.vercel.app

CodeCritic is a full-stack AI-powered code review platform designed to help developers write cleaner, faster, and more reliable code. The platform leverages Groq's LLaMA 3.3 70B model to perform intelligent code analysis, detect bugs, identify performance bottlenecks, suggest optimizations, and calculate time and space complexity across multiple programming languages.

Users can analyze code instantly, receive structured AI feedback, optimize code with a single click, manage review history, and improve code quality through actionable recommendations powered by advanced AI.

---

## 🚀 Key Features

### 🧠 AI Code Review

* Analyze code using LLaMA 3.3 70B via Groq API.
* Detect syntax errors, logic bugs, runtime issues, and edge cases.
* Receive structured feedback with detailed explanations.
* Identify security vulnerabilities and coding best-practice violations.

### ⚡ AI Code Optimization

* One-click code optimization.
* Automatically fixes bugs and edge cases.
* Improves performance and readability.
* Generates production-ready optimized code.
* Compare complexity before and after optimization.

### 💻 Professional Coding Environment

* Monaco Editor integration for a VS Code-like experience.
* Syntax highlighting for multiple programming languages.
* Real-time language detection.
* Clean and distraction-free development workflow.

### 📚 Session History

* Automatically save every code review session.
* Browse previous code analyses.
* Reload and inspect past reviews.
* Delete unwanted sessions anytime.

### 🌐 Multi-Language Support

* Supports all major programming languages.
* Automatic language detection powered by AI.
* Language-specific analysis and optimization.
* Consistent review experience across technologies.

### 🔐 Secure Authentication

* Clerk-based authentication and user management.
* Email/password authentication.
* Google OAuth integration.
* GitHub OAuth integration.

### 👤 Profile Management

* Manage user profile information.
* Upload custom profile avatars.
* Update account details securely.
* Password management and account controls.

### 🎨 Modern Responsive UI

* Built using React and TailwindCSS.
* Premium dark-themed developer experience.
* Fully responsive across desktop and mobile devices.
* Clean and intuitive interface inspired by modern SaaS platforms.

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* TailwindCSS
* React Router
* Monaco Editor
* Axios
* Clerk React
* React Icons
* DevIcons React

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose ODM
* Clerk Authentication
* Groq SDK
* Svix Webhooks
* Helmet
* CORS
* Morgan

### AI Integration

* Groq API
* LLaMA 3.3 70B Versatile
* AI Code Review
* AI Code Optimization
* Programming Language Detection
* Complexity Analysis

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗️ Getting Started

### Prerequisites

Before running the project, ensure you have:

* Node.js installed
* MongoDB Atlas account
* Clerk account
* Groq API key

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/karunya666/CodeCritic.git
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Run Backend

```bash
cd backend
npm run dev
```

### 5. Run Frontend

```bash
cd frontend
npm run dev
```

---

## 🔑 Environment Configuration

### Backend `.env`

```env
MONGODB_URI=your_mongodb_connection_string

GROQ_API_KEY=your_groq_api_key

CLERK_SECRET_KEY=your_clerk_secret_key

CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

CLIENT_URL=http://localhost:5173

PORT=5000

NODE_ENV=development
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

## 🌐 API Overview

| Route | Description |
| -------------------------------- | -------------------------------- |
| POST /api/review | Analyze code and create review session |
| POST /api/review/optimise | Generate optimized code |
| POST /api/review/detect | Detect programming language |
| PATCH /api/review/:id | Update an existing review session |
| GET /api/sessions | Retrieve user review history |
| GET /api/sessions/:id | Get review session details |
| DELETE /api/sessions/:id | Delete review session |
| POST /api/webhooks/clerk | Sync Clerk user data |

---

## 🔄 Platform Workflow

### AI Code Review Workflow

1. User writes or pastes code into the Monaco Editor.
2. Code is submitted for AI analysis.
3. Groq's LLaMA 3.3 70B model reviews the code.
4. AI identifies errors, improvements, and complexity metrics.
5. Structured feedback is displayed in the review panel.
6. Review session is automatically stored for future access.

### AI Code Optimization Workflow

1. User clicks the Optimize button.
2. AI rewrites the code using best practices.
3. Bugs and inefficiencies are removed.
4. Optimized code replaces the original version.
5. Code is automatically re-analyzed.
6. Updated complexity metrics and recommendations are displayed.

---

## 🚀 Deployment

### Frontend

https://code-critic-six.vercel.app

### Backend

https://codecritic-ydsh.onrender.com

### Database

MongoDB Atlas

---

## 🎯 Future Enhancements

* Algorithm Visualizer with step-by-step execution.
* Export code reviews as PDF.

---

## 👨‍💻 Author

**Karunya**

Built to help developers write better code, identify bugs faster, optimize performance, and improve software quality through AI-powered code reviews.
