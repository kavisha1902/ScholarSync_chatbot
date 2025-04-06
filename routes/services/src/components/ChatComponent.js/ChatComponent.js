import { sendMessageToChatbot } from "./chatService";

const handleChat = async () => {
  const response = await sendMessageToChatbot("How can I get an internship at Google?");
  console.log("Chatbot Response:", response);
};
