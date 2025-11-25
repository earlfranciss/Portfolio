export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  techStack: {
    name: string;
    icon: string;
  }[];
  link: string;
  github: string;
  team: {
    name: string;
    role: string;
  }[];
  features?: {
    category: string;
    items: string[];
  }[];
  message: string;
}

export const ProjectData: Project[] = [
  {
    id: 1,
    title: "SwiftShield",
    description: "An AI-driven detection and prevention system for phishing attacks designed to analyze and classify suspicious messages, links, and websites in real time.",
    images: [
      "/assets/SwiftShield/Login.png",
      "/assets/SwiftShield/Register.png",
      "/assets/SwiftShield/HomePage.png",
      "/assets/SwiftShield/Analytics.png",
      "/assets/SwiftShield/LogsDetails.png",
      "/assets/SwiftShield/LockScreen.png",
      "/assets/SwiftShield/AccessRestriction.png",
      "/assets/SwiftShield/In-AppRestrictAccess.png",
    ],
    techStack: [
      { name: "React Native", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Flask", icon: "https://skillicons.dev/icons?i=flask" },
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
    ],
    github: "https://github.com/earlfranciss/ProductivIO",
    link: "https://github.com/earlfranciss/SwiftShield",
    team: [
      { name: "Miranda Lois Arriola", role: "Project Manager" },
      { name: "Earl Francis Ong", role: "Lead Backend/AI Engineer" },
      { name: "Stephen Hans Amistoso", role: "Backend Developer" },
      { name: "Sheilmae Jean Furog", role: "Frontend Developer" },
      { name: "Via Gelig", role: "Frontend Developer" },
      { name: "John Michael Lim", role: "Quality Analyst" },
    ],
    features: [
      {
        category: "Phishing Website Detection",
        items: [
          "AI-Powered URL Classification - Analyzes and categorizes URLs using machine learning algorithms",
          "Suspicious Site Identification - Detects phishing websites through pattern recognition",
          "Real-Time Threat Assessment - Evaluates website legitimacy before user access",
          "Domain Reputation Checking - Cross-references URLs against known threat databases",
          "Visual Similarity Detection - Identifies lookalike domains mimicking legitimate sites"
        ]
      },
      {
        category: "Email & SMS Analysis",
        items: [
          "Message Content Scanning - Analyzes text for phishing indicators and social engineering tactics",
          "Link Extraction & Verification - Identifies and validates embedded URLs in messages",
          "Sender Authentication - Verifies sender identity and email/SMS source legitimacy",
          "Notification Monitoring - Scans push notifications for malicious content",
          "Multi-Language Support - Detects phishing attempts across different languages"
        ]
      },
      {
        category: "AI-Driven Detection Models",
        items: [
          "Ensemble Classification - Combines multiple ML models for improved accuracy",
          "Natural Language Processing - Analyzes message semantics and linguistic patterns",
          "Feature Extraction - Identifies key phishing indicators from text and metadata",
          "Continuous Model Training - Adapts to new phishing techniques and attack vectors",
          "Confidence Scoring - Provides probability ratings for threat classification"
        ]
      },
      {
        category: "Real-Time Monitoring & Protection",
        items: [
          "Activity Tracking - Monitors user interactions with links and messages",
          "Instant Threat Alerts - Provides immediate warnings for detected phishing attempts",
          "Access Restriction - Blocks access to confirmed malicious websites and content",
          "Lock Screen Protection - Prevents unauthorized access during threat detection",
          "Comprehensive Logging - Records all scans and detections for audit trails"
        ]
      },
    ],
    message: "Made with ❤️ by the SwiftShield Team!",
  },
  {
    id: 2,
    title: "ProductivIO",
    description: "Productivity Hub — a web platform with notes, tasks, Pomodoro timer, flashcards, and quizzes.",
    images: [
      "/assets/ProductivIO/LandingPage.png",
      "/assets/ProductivIO/Login.png",
      "/assets/ProductivIO/Register.png",
      "/assets/ProductivIO/Tasks.png",
      "/assets/ProductivIO/Notes.png",
      "/assets/ProductivIO/Flashcard.png",
      "/assets/ProductivIO/Study.png",
      "/assets/ProductivIO/Quiz.png",
      "/assets/ProductivIO/Pomodoro.png",
    ],
    techStack: [
      { name: "React", icon: "https://skillicons.dev/icons?i=react" },
      { name: "ASP.NET Core", icon: "https://skillicons.dev/icons?i=dotnet" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" },
    ],
    github: "https://github.com/earlfranciss/ProductivIO",
    link: "https://github.com/earlfranciss/ProductivIO",
    team: [],
    features: [
      {
        category: "Notes Management",
        items: [
          "Rich Text Editor - Format text with headings, bold, italic, and underline styling",
          "Code Block Support - Syntax-highlighted code snippets for developers",
          "List Formatting - Create ordered and unordered lists for organized content",
          "Media Attachments - Attach images and files directly to notes",
          "Export Options - Download notes in Markdown or JSON formats",
          "Import Functionality - Upload and restore notes from backup files",
          "Auto-Save - Automatic saving to prevent data loss"
        ]
      },
      {
        category: "Task & Habit Tracking",
        items: [
          "Task Management - Create, edit, and delete tasks with customizable priorities",
          "Kanban Board - Visual task organization with drag-and-drop functionality",
          "Priority Levels - Assign importance levels (high, medium, low) to tasks",
          "Habit Tracking - Monitor daily habits and build consistent routines",
          "Streak Counter - Track consecutive days of habit completion",
          "Progress Visualization - View completion rates and productivity metrics",
          "Task Categories - Organize tasks by projects or categories"
        ]
      },
      {
        category: "Pomodoro Timer",
        items: [
          "Customizable Intervals - Set personalized work and break durations",
          "Work Cycles - Standard 25-minute focused work sessions",
          "Break Management - Scheduled short (5min) and long (15min) breaks",
          "Sound Notifications - Audio alerts for session start/end",
          "Focus Mode - Distraction-free interface during work sessions",
          "Session History - Track completed Pomodoro sessions",
          "Pause & Resume - Flexible control over timer during sessions"
        ]
      },
      {
        category: "Flashcards & Study Tools",
        items: [
          "Deck Creation - Organize flashcards into themed study decks",
          "Question-Answer Format - Traditional flashcard with front/back content",
          "Study Mode - Interactive review with spaced repetition",
          "Confidence Rating - Mark cards as 'Got it' or 'Need Review'",
          "Progress Tracking - Monitor mastery level for each deck",
          "Card Shuffle - Randomize card order for varied practice",
          "Multi-Deck Support - Create unlimited decks for different subjects"
        ]
      },
      {
        category: "Quiz Builder & Assessment",
        items: [
          "Multiple Choice Questions - Create MCQ-style assessments",
          "True/False Questions - Binary choice question format",
          "Short Answer Support - Open-ended text response questions",
          "Quiz Customization - Set number of questions and time limits",
          "Instant Scoring - Automatic grading with detailed results",
          "Performance Analytics - Track quiz scores and improvement over time",
          "Question Bank - Reuse questions across multiple quizzes"
        ]
      }
    ],
    message: "Made with ❤️ by Earl Francis!",
  },
  {
    id: 3,
    title: "HRConnect AIVA",
    description: "An intelligent HR assistant that provides 24/7 support through an AI-powered chatbot. Features include instant policy retrieval, leave validation, and real-time HRIS integration, streamlining operations while boosting employee satisfaction.",
    images: [
      "/assets/HRConnect/Login.png",
      "/assets/HRConnect/Register.png",
      "/assets/HRConnect/Dashboard.png",
      "/assets/HRConnect/WidgetNewChat.png",
      "/assets/HRConnect/WidgetOpenChat.png",
      "/assets/HRConnect/FullScreenNewChat.png",
      "/assets/HRConnect/FullScreenOpenChat.png",
      "/assets/HRConnect/LandingPage.png",
    ],
    techStack: [
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "FastAPI", icon: "https://skillicons.dev/icons?i=fastapi" },
      { name: "LangChain & LangGraph", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Azure OpenAI", icon: "https://skillicons.dev/icons?i=azure" },
      { name: "ChromaDB", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/chroma.svg" },
      { name: "SQLAlchemy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" },
    ],
    github: "https://github.com/earlfranciss/HRConnect-Frontend",
    link: "http://20.106.176.126:4040",
    team: [
      { name: "Raquel Sanchez", role: "Project Manager" },
      { name: "Rhea Arnado", role: "DevOps Engineer" },
      { name: "Shaundyl Alipio", role: "Lead Backend Developer" },
      { name: "Eugene Apostol", role: "Backend Developer" },
      { name: "Louell Grey Miones", role: "Backend Developer" },
      { name: "Earl Francis Ong", role: "Lead Frontend Developer" },
      { name: "James Anquillano", role: "Frontend Developer" },
    ],
    features: [
      {
        category: "Intelligent Agentic Chatbot",
        items: [
          "Query Classification - Automatically determines if questions are about policies or personal data",
          "Multi-Source RAG - Routes queries to appropriate data sources (Chroma DB or SQL Server)",
          "Compound Query Handling - Processes multiple questions in one request",
          "Smart Context Management - Maintains conversation state across queries"
        ]
      },
      {
        category: "Authentication & Security",
        items: [
          "JWT-based authentication",
          "Password hashing with bcrypt",
          "Token blacklisting for logout",
          "Protected API endpoints",
          "Role-based access control ready"
        ]
      },
      {
        category: "HR Management Features",
        items: [
          "Employee leave balance tracking",
          "Leave request management",
          "Company policy document search",
          "Attendance records (planned)",
          "Performance reviews (planned)"
        ]
      },
      {
        category: "Advanced RAG System",
        items: [
          "Vector Search - ChromaDB for policy document retrieval",
          "Semantic Search - SentenceTransformer embeddings",
          "SQL Integration - Direct database queries for employee data",
          "LangGraph Orchestration - Workflow automation for query routing"
        ]
      }
    ],
    message: "Made with ❤️ by the HRConnect Team!",
  },

];