require("dotenv").config();

module.exports = {
  apiKey: process.env.GROQ_API_KEY,
  port: process.env.PORT || 8000,
  models: {
    qwen: "qwen-qwq-32b",
    llama: "llama3-70b-8192"
  },
  chatbotPrompts: {
    career_guidance: "I'm interested in AI and Machine Learning. What career paths should I explore?",
    skill_development: "What are the most important skills for a software engineer?",
    resume_tips: "How do I write a strong resume for a fresh graduate?",
    interview_prep: "What are the most commonly asked data structures and algorithms interview questions?",
    scholarships: "Can you suggest fully funded scholarships for studying abroad?",
    study_tips: "How can I improve my focus while studying?",
    motivation: "I feel burned out while preparing for exams. How can I stay motivated?",
    internships: "How can I get an internship at Google or Microsoft?",
    freelancing: "Is freelancing a good option for a student?"
  }
};
