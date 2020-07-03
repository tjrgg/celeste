const { Command } = require('klasa');
const { getQueue, getQueueChannel, isQueueChannelManaged, saveQueue } = require('../../utils/queue');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Joins a queue.', runIn: [ 'text' ], usage: '<name:string>', usageDelim: ' ' });
	}

	async run(msg, [ name ]) {
		let queue = getQueue(this.client, name) || undefined;

		if (!queue) return msg.sendError(msg.language.get('QUEUE_NOT_FOUND', name));

		if (queue.members.includes(msg.author.id)) return msg.sendError(msg.language.get('QUEUE_JOIN_ALREADY_MEMBER', name));
		if (queue.paused) return msg.sendError(msg.language.get('QUEUE_JOIN_PAUSED', name));
		if (queue.cap <= queue.members.length) return msg.sendError(msg.language.get('QUEUE_JOIN_CAP_REACHED', name));

		const queueChannel = await getQueueChannel(this.client, queue);
		if (queueChannel) {
			if (isQueueChannelManaged(this.client, queueChannel)) await queueChannel.updateOverwrite(msg.author, { 'VIEW_CHANNEL': true });
		}

		queue.members.push(msg.author.id);

		queue.message = (await msg.sendQueue(queue)).id;
		saveQueue(this.client, queue);

		(await msg.send(msg.language.get('QUEUE_JOINED', name))).delete({ timeout: 1000*this.client.config.messageTimeout });
	}

};
