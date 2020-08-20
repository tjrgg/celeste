const { Command } = require('klasa');
const { delQueue, getQueue } = require('../../utils/queue');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Ends a queue.', runIn: [ 'text' ], usage: '<name:string>', usageDelim: ' ' });
	}

	async run(msg, [ name, cap = 25 ]) {
		let queue = getQueue(this.client, name) || undefined;

		if (!queue) return msg.sendError(msg.language.get('QUEUE_NOT_FOUND', name));

		queue.ended = true;

		await delQueue(this.client, queue);
		(await msg.send(msg.language.get('QUEUE_ENDED', name))).delete({ timeout: 1000*this.client.config.messageTimeout });
	}

};
