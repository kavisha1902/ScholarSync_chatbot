import axios from "axios";

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post("http://localhost:8000/chat", {
      user_id: "test_user",
      message: message,
      model: "qwen",
      prompt_type: "career_guidance"
    });

    return response.data.response;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};
