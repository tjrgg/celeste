const { Command } = require('klasa');
const { getQueue, getQueueCategory, saveQueue } = require('../../utils/queue');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { aliases: [ 'start' ], description: 'Starts a queue.', runIn: [ 'text' ], usage: '<name:string{2,15}> [cap:number{1,50}] [channel:boolean]', usageDelim: ' ' });
	}

	async run(msg, [ name, cap = 25, channel = false ]) {
		let queue = getQueue(this.client, name) || undefined;

		if (queue) return msg.sendError(msg.language.get('QUEUE_EXISTS', name));

		const queueCategory = channel ? await getQueueCategory(this.client) : undefined;
		const queueChannel = queueCategory ? await msg.guild.channels.create(msg.language.get('QUEUE_CHANNEL_NAME', name), { parent: queueCategory, permissionOverwrites: queueCategory.permissionOverwrites }).catch(() => {
			return msg.sendError(msg.language.get('QUEUE_CHANNEL_ERROR', name));
		}) : msg.channel;

		if (!queueChannel) throw 'queueChannel undefined';
		await queueChannel.updateOverwrite(msg.author, { 'VIEW_CHANNEL': true });

		queue = {
			cap,
			channel: queueChannel.id,
			members: [ msg.author.id ],
			message: null,
			name,
			paused: false
		};

		queue.message = (await msg.sendQueue(queue)).id;
		saveQueue(this.client, queue);

		(await msg.send(msg.language.get('QUEUE_STARTED', name))).delete({ timeout: 1000*this.client.config.messageTimeout });
	}

};
