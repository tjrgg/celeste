const config = require('./config/config.json');

const { Client } = require('klasa');

const bot = new Client({
	disabledCorePieces: [ 'commands' ],
	fetchAllMembers: false,
	prefix: config.botPrefix || '!',
	readyMessage: (client) => `Online.`
});

bot.config = config;
bot.queues = new Map();

bot.login(config.botToken);
