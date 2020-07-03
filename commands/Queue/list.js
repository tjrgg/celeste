const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { getQueue, getQueues } = require('../../utils/queue');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Joins a queue.', runIn: [ 'text' ] });
	}

	async run(msg) {
		const queues = getQueues(this.client);

		const queuesList = [];

		for (const queue of queues) {
			queuesList.push(`- ${msg.language.get('QUEUE_LIST_ITEM', getQueue(this.client, queue))}`);
		}

		const response = new MessageEmbed();
		response.setTitle(msg.language.get('QUEUE_LIST_TITLE'));
		response.setDescription(queuesList.length > 0 ? queuesList.join('\n') : msg.language.get('QUEUE_LIST_EMPTY'));
		await msg.sendEmbed(response);
	}

};
