const { Language } = require('klasa');

module.exports = class extends Language {

	constructor(...args) {
		super(...args);
		this.language = {
			DEFAULT: (key) => `${key} has not been localized for en-US yet.`,
			DEFAULT_LANGUAGE: 'Default Language',
			PREFIX_REMINDER: (prefix = `@${this.client.user.tag}`) => `The prefix${Array.isArray(prefix) ?
				`es for this guild are: ${prefix.map(pre => `\`${pre}\``).join(', ')}` :
				` in this guild is set to: \`${prefix}\``
				}`,
			TEXT_PROMPT_ABORT_OPTIONS: [ 'abort', 'stop', 'cancel' ],

			ERROR_TITLE: 'ERROR',
			QUEUE_CHANNEL_ERROR: (queueName) => `Unable to create channel for ${queueName} in configured category. Does the category exist?`,
			QUEUE_CHANNEL_NAME: (queueName) => `queue-${queueName}`,
			QUEUE_ENDED: (queueName) => `Queue ${queueName} ended.`,
			QUEUE_EXISTS: (queueName) => `The queue ${queueName} already exists.`,
			QUEUE_JOIN_ALREADY_MEMBER: (queueName) => `You are already a member of the queue ${queueName}.`,
			QUEUE_JOIN_CAP_REACHED: (queueName) => `The queue ${queueName} already has the maximum number of members.`,
			QUEUE_JOIN_ERROR: (queueName) => `There was a problem adding you to the queue ${queueName}.`,
			QUEUE_JOIN_PAUSED: (queueName) => `The queue ${queueName} is paused and not accepting new members.`,
			QUEUE_JOINED: (queueName) => `Joined queue ${queueName}.`,
			QUEUE_LEAVE_NOT_MEMBER: (queueName) => `You are not a member of the queue ${queueName}.`,
			QUEUE_LEFT: (queueName) => `Left queue ${queueName}.`,
			QUEUE_LIST_EMPTY: 'No open queues.',
			QUEUE_LIST_ITEM: (queue) => `${queue.name} - Cap: ${queue.cap}, Members: ${queue.members.length}, Status: ${queue.paused ? 'Paused' : 'Open'}`,
			QUEUE_LIST_TITLE: 'Queue List',
			QUEUE_MEMBERS: (queue, members) => queue.members.length > 0 ? `${queue.members.map(m => `- ${members.cache.get(m).toString()}`).join('\n')}` : 'No members in the queue.',
			QUEUE_NOT_FOUND: (queueName) => `There is no queue named ${queueName}.`,
			QUEUE_REMOVE_NOT_MEMBER: (queueName, member) => `${member} is not a member of the queue ${queueName}.`,
			QUEUE_REMOVED: (queueName, member) => `Member ${member} removed from queue ${queueName}.`,
			QUEUE_STARTED: (queueName) => `Queue ${queueName} started.`,
			QUEUE_TITLE: (queue) => `Queue: ${queue.name} (${queue.members.length}/${queue.cap})${queue.paused ? ' - Paused' : ''}`,
			QUEUE_TITLE_ENDED: (queue) => `Queue: ${queue.name} (${queue.members.length}/${queue.cap}) - Ended`,

			COMMAND_PING: 'Ping?',
			COMMAND_PING_DESCRIPTION: 'Runs a connection test to Discord.',
			COMMAND_PINGPONG: (diff, ping) => `Pong! (Roundtrip took: ${diff}ms. Heartbeat: ${ping}ms.)`,
			COMMAND_HELP_DESCRIPTION: 'Display help for a command.',
			COMMAND_HELP_NO_EXTENDED: 'No extended help available.',
			COMMAND_HELP_USAGE: (usage) => `Usage: ${usage}`,
			COMMAND_HELP_EXTENDED: 'Extended Help:'
		};
	}

	async init() {
		await super.init();
	}

};
