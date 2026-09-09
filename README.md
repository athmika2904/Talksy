# Talksy

### AI-powered social communication practice for real-world conversations.

Talksy is a full-stack AI application designed to help people become more comfortable with everyday social communication.

Instead of simply giving communication advice, Talksy lets users **practice conversations, generate better replies, and build confidence through repeated interaction**.

---

## What is Talksy?

Starting a conversation, replying to a message, or knowing what to say in an awkward situation can sometimes be harder than it looks.

Talksy provides a space where users can:

- Get help writing natural replies
- Practice realistic social situations with an AI
- Receive feedback on their communication
- Complete small daily communication challenges
- Track their progress over time

The goal isn't to make conversations sound perfect.

It's to make communicating feel **more natural and less intimidating**.

---

## Features

###  Reply Coach

Describe a message or situation you're unsure how to respond to.

Talksy generates **three possible replies** based on the tone you choose.

Available tones include:

- Casual
- Friendly
- Funny
- Confident
- Polite
- Direct

The feature is designed around short, realistic responses rather than overly formal AI-generated messages.

---

###  Practice Mode

Practice conversations without the pressure of a real social interaction.

Choose a situation such as:

- Meeting someone new
- Talking to a crush
- Making conversation
- Handling awkward situations

The AI responds to your messages as the conversation progresses.

After finishing, Talksy analyzes the conversation and provides:

- Communication score
- Strengths
- Areas to improve
- Personalized feedback
- A practical tip for the next conversation

---

###  Daily Challenges

Talksy provides small communication challenges designed to encourage users to practice in real life.

Examples include:

- Asking a follow-up question
- Giving a genuine compliment
- Starting a conversation
- Keeping a conversation going

Completed challenges contribute to:

- XP
- Streaks
- Challenge history
- Overall progress

The idea is to turn communication practice into small, achievable actions rather than a large goal.

---

###  Progress Tracking

Talksy keeps track of communication activity over time.

The dashboard displays:

- Confidence score
- Conversation count
- Current streak
- XP
- Completed challenges

Practice performance contributes to the confidence score, allowing the dashboard to reflect the user's progress rather than showing static statistics.

---

###  Authentication

Talksy includes user authentication with:

- Signup
- Login
- Protected routes
- Persistent authentication
- User-specific progress
- Logout

User-specific challenge and progress data is stored in MongoDB.

---

## Tech Stack

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- ES Modules

### AI

- Google Gemini API
- AI-powered conversation generation
- AI-powered practice feedback

### Development

- Git
- GitHub
- npm

---

## Architecture

Talksy follows a client-server architecture.

```text
                    ┌──────────────────────┐
                    │       Talksy         │
                    │      Frontend        │
                    │ React + TypeScript   │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Backend        │
                    │ Node.js + Express    │
                    └───────┬────────┬─────┘
                            │        │
                    ┌───────▼───┐ ┌──▼──────────┐
                    │ MongoDB   │ │ Gemini API  │
                    │  Database │ │     AI      │
                    └───────────┘ └─────────────┘

The frontend handles the user experience while the backend handles authentication, data persistence, challenge logic, and communication with AI services.

Project Structure
Talksy/
│
├── client/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ReplyCoach.tsx
│   │   │   │
│   │   │   ├── Practice/
│   │   │   │   ├── PracticeSetup.tsx
│   │   │   │   ├── PracticeChat.tsx
│   │   │   │   └── PracticeFeedback.tsx
│   │   │   │
│   │   │   ├── Challenges/
│   │   │   │   ├── Challenges.tsx
│   │   │   │   ├── ChallengeCard.tsx
│   │   │   │   └── ChallengeDetails.tsx
│   │   │   │
│   │   │   ├── Login.tsx
│   │   │   └── Signup.tsx
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── DailyChallenge.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── practiceRoutes.js
│   │   └── ChallengeRoutes.js
│   │
│   ├── services/
│   │   ├── authServices.js
│   │   ├── AIService.js
│   │   ├── PracticeService.js
│   │   └── ChallengeService.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
Getting Started

Follow these steps to run Talksy locally.

1. Clone the repository
git clone https://github.com/athmika2904/Talksy.git
cd Talksy
2. Setup the Backend

Move into the server directory:

cd server

Install dependencies:

npm install

Create a .env file:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Start the backend:

npm run dev

The backend should now be running on:

http://localhost:5000
3. Setup the Frontend

Open another terminal.

From the project root:

cd client

Install dependencies:

npm install

Start the development server:

npm run dev

Vite will provide the local frontend URL, usually:

http://localhost:5173
Environment Variables
Server

Create:

server/.env

with:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
Variable Description
Variable	Purpose
PORT	Port used by the Express server
MONGODB_URI	MongoDB database connection string
JWT_SECRET	Secret used for JWT authentication
GEMINI_API_KEY	API key used for Gemini AI features

Never commit .env files or API keys to GitHub.

API Overview
Authentication
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/activity
AI
POST /api/ai/reply
Practice
POST /api/practice/session
POST /api/practice/feedback
Challenges
GET  /api/challenges/today
POST /api/challenges/evaluate
POST /api/challenges/complete
How the Main Features Work
Reply Coach
User
  │
  │ message + tone
  ▼
React Frontend
  │
  │ POST request
  ▼
Express API
  │
  ▼
Gemini
  │
  │ generated replies
  ▼
Express API
  │
  ▼
React UI

The AI is instructed to generate three short, natural responses instead of returning a long explanation.

Practice Mode
Choose Situation
       │
       ▼
Start Conversation
       │
       ▼
AI responds
       │
       ▼
User continues conversation
       │
       ▼
Finish Practice
       │
       ▼
AI evaluates conversation
       │
       ├── Score
       ├── Strengths
       ├── Improvements
       └── Tip

The resulting score is also used to update the user's confidence progress.

Daily Challenges
Daily Challenge
      │
      ▼
User attempts challenge
      │
      ▼
AI evaluates response
      │
      ▼
Challenge completed
      │
      ├── XP
      ├── Streak
      └── History
Data Model

A user stores both account information and progress information.

User
│
├── name
├── email
├── password
│
├── xp
├── streak
├── completedChallenges
│
├── conversations
├── confidenceScore
├── confidenceSamples
│
└── challengeHistory[]
      ├── challengeId
      ├── title
      ├── difficulty
      ├── reward
      └── date
Design Approach

Talksy is intentionally built around small interactions instead of long learning sessions.

The main loop is:

Practice
   ↓
Get feedback
   ↓
Try again
   ↓
Build confidence
   ↓
Practice in real life

Rather than presenting communication as something that can be learned entirely through theory, Talksy focuses on actually doing the conversation.

Current Scope

Talksy currently focuses on three core experiences:

Reply Coach — help with what to say
Practice Mode — practice how to say it
Daily Challenges — take that practice into real situations

Together, these form the main communication practice loop of the application.

Future Improvements

Possible future additions include:

Conversation history
More practice scenarios
Personalized challenge difficulty
Screenshot conversation analysis
More detailed progress analytics
Voice-based practice
Improved personalization based on previous sessions
Production deployment
Mobile version
Running in Production

Before deploying Talksy:

Configure production MongoDB
Add production environment variables
Restrict CORS to the frontend domain
Use HTTPS
Keep API keys server-side
Configure production frontend/backend URLs
Disable development-only logging
Contributing

Contributions are welcome.

If you'd like to contribute:

git clone https://github.com/athmika2904/Talksy.git

Create a new branch:

git checkout -b feature/your-feature

Make your changes, test them locally, and open a pull request.

License

This project is currently available for personal and educational use.

Author

Athmika

Built as a full-stack project combining:

React
Node.js
Express
MongoDB
AI
REST APIs
