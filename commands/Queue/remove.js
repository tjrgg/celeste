const { Command } = require('klasa');
const { getQueue, getQueueChannel, isQueueChannelManaged, saveQueue } = require('../../utils/queue');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Removes a member from a queue.', runIn: [ 'text' ], usage: '<name:string> <member:member>', usageDelim: ' ' });
	}

	async run(msg, [ name, member ]) {
		let queue = getQueue(this.client, name) || undefined;

		if (!queue) return msg.sendError(msg.language.get('QUEUE_NOT_FOUND', name));

		if (!queue.members.includes(member.user.id)) return msg.sendError(msg.language.get('QUEUE_REMOVE_NOT_MEMBER', name, member));

		const queueChannel = await getQueueChannel(this.client, queue);
		if (queueChannel) {
			if (isQueueChannelManaged(this.client, queueChannel)) await queueChannel.updateOverwrite(member.user, { 'VIEW_CHANNEL': false });
		}

		queue.members.splice(queue.members.indexOf(member.user.id), 1);

		queue.message = (await msg.sendQueue(queue)).id;
		saveQueue(this.client, queue);

		(await msg.send(msg.language.get('QUEUE_REMOVED', name, member))).delete({ timeout: 1000*this.client.config.messageTimeout });
	}

};
