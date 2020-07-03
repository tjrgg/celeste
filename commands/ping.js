const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, { description: 'Pong!' });
	}

	async run(msg) {
		const message = await msg.sendMessage(msg.language.get('COMMAND_PING'));
		return message.edit(msg.language.get('COMMAND_PINGPONG', message.createdTimestamp - msg.createdTimestamp, Math.round(this.client.ping)));
	}

};
