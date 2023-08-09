const {Firestore} = require('@google-cloud/firestore');
const TelegramBot = require('node-telegram-bot-api');

const firestore = new Firestore();
const botToken = '6692872924:AAHkPkdR5bqT9hbfDy0NU1tSvSVoo9U7eco';

exports.telegramWebhook = async (req, res) => {
  const bot = new TelegramBot(botToken, {polling: false}); // No polling since we're using webhooks

  const update = req.body;

  if (update.message && update.meswsage.new_chat_members) {
    const chatId = update.message.chat.id;

    for (const user of update.message.new_chat_members) {
      // Log to Firestore
      await firestore.collection('log').add({
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name || null,
        username: user.username || null,
        dateJoined: new Date()
      });

      // Optional: Send a message to the chat about the new member
      bot.sendMessage(chatId, `Welcome, ${user.first_name}!`);
    }
  }

  res.status(200).send('Event received');
};