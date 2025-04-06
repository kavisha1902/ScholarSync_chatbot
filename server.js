import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure installed: `npm install node-fetch`
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8080;
const GROQ_API_KEY = process.env.GROQ_API_KEY || "your-groq-api-key";

app.use(cors());
app.use(express.json());

console.log("🚀 Groq API Key:", GROQ_API_KEY ? "✅ Loaded" : "❌ MISSING");

// ✅ Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mentor Me Chatbot API",
      version: "1.0.0",
      description: "API to communicate with the Mentor Me chatbot",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["./server.js"], // Documented endpoints are in this file
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ Mentor Me Chatbot API is running!");
});

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Get a response from the chatbot
 *     description: Sends a message to the chatbot and gets a response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Provide me a roadmap for AI/ML"
 *     responses:
 *       200:
 *         description: Successful chatbot response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "Here's a roadmap for AI/ML..."
 *       400:
 *         description: Bad request (missing message)
 *       500:
 *         description: Server error
 */
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen-qwq-32b",
        messages: [{ role: "user", content: message }],
        max_tokens: 5000, // Increased for longer responses
        temperature: 0.5, // Adjust for creativity (0.7 is a balanced choice)
        top_p: 0.9 // Ensure diverse but relevant responses
      }),
    });

    const data = await response.json();
    console.log("📝 API Response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("❌ API Error:", data);
      return res.status(response.status).json({ error: "Failed to get a response from AI." });
    }

    const botResponse = data.choices?.[0]?.message?.content || "I couldn't process that request.";
    return res.json({ response: botResponse });

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📜 Swagger UI available at http://localhost:${PORT}/api-docs`);
});
