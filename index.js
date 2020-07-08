const config = require('./config/config.json');
const { readQueues } = require('./utils/persistence');

const { Client } = require('klasa');

const bot = new Client({
	disabledCorePieces: [ 'commands' ],
	fetchAllMembers: false,
	prefix: config.botPrefix || '!',
	readyMessage: (client) => `Online.`
});

bot.config = config;
bot.queues = readQueues() || {};

bot.login(config.botToken);
