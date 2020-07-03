const { Command } = require('klasa');
const { getQueue, saveQueue } = require('../../utils/queue');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Pauses a queue.', runIn: [ 'text' ], usage: '<name:string>', usageDelim: ' ' });
	}

	async run(msg, [ name ]) {
		let queue = getQueue(this.client, name) || undefined;

		if (!queue) return msg.sendError(msg.language.get('QUEUE_NOT_FOUND', name));

		if (queue.paused) return msg.sendError(`The queue ${name} is already paused.`);

		queue.paused = true;

		queue.message = (await msg.sendQueue(queue)).id;
		saveQueue(this.client, queue);

		(await msg.send(`Queue ${name} paused.`)).delete({ timeout: 1000*this.client.config.messageTimeout });
	}

};
