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
    link: "http://20.106.176.126:4040"
  },

];
