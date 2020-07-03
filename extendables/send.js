const { Extendable } = require('klasa');
const { Message, MessageEmbed, TextChannel } = require('discord.js');
const { getQueueChannel } = require('../utils/queue');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, { appliesTo: [ Message, TextChannel ], name: 'send' });
	}

	async sendError(message) {
		await this.sendEmbed(new MessageEmbed()
			.setTitle(this.language.get('ERROR_TITLE'))
			.setDescription(message)
			.setColor(0xFF0000)
		);
	}

	async sendQueue(queue) {
		const channel = await getQueueChannel(this.client, queue).catch(() => undefined);
		if (!channel) return;

		const message = channel.messages.cache.get(queue.message);
		if (message && message.deletable) await message.delete();

		return channel.sendEmbed(new MessageEmbed()
			.setTitle(this.language.get(queue.ended ? 'QUEUE_TITLE_ENDED' : 'QUEUE_TITLE', queue))
			.addField('Members', this.language.get('QUEUE_MEMBERS', queue, this.guild.members))
			.setColor(0xFFFF00)
		);
	}

};
