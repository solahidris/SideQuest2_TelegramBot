const TelegramBot = require("node-telegram-bot-api");

const token = "6692872924:AAHkPkdR5bqT9hbfDy0NU1tSvSVoo9U7eco";

const bot = new TelegramBot(token, { polling: true });


bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Avoid echoing its own messages or other bots' messages
  if (msg.from.is_bot) return;

  // Check if message is from a group or supergroup
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    try {
      // Actual ID to check
      const userIdToCheck = 680274915;
      // Get the specific chat member's details
      const user = await bot.getChatMember(chatId, userIdToCheck);
      // If user exist in group (not left or kicked out)
      if (user && user.status !== "left" && user.status !== "kicked") {
        // Send message to chat
        bot.sendMessage(chatId, `userid:${userIdToCheck} is in here`);
      }
    } catch (error) {
      console.log("Error checking user:", error);
    }
  }
  // Send a message to the chat with the same content
  bot.sendMessage(chatId, msg.text);
});

// Error Handling
bot.on("polling_error", (error) => {
  console.log("Error code:", error.code);
  console.log("Error message:", error.message);
  console.log("Error stack:", error.stack);
  if (error.response && error.response.body) {
    console.log("Error response body:", error.response.body);
  }
});
console.log("Loaded Token:", token);

console.log("Bot is running...");

// node bot.js
// testing commit git