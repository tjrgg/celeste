const { writeQueues } = require('./persistence');

async function checkQueueMembers(client, queue, members) {
	const queueMembers = queue.members;
	let queueMembersRemoved = 0;
	for (const member of queueMembers) {
		if (!members.cache.has(member)) queue.members.splice(queue.members.indexOf(member), 1);
		queueMembersRemoved++;
	}
	await saveQueue(client, queue);
	return queueMembersRemoved;
}

async function delQueue(client, queue) {
	await delQueueChannel(client, queue);
	delete client.queues[queue.name];
}

async function delQueueChannel(client, queue) {
	const queueChannel = await getQueueChannel(client, queue);
	if (isQueueChannelManaged(client, queueChannel)) await queueChannel.delete();
}

function getQueues(client) {
	return Object.keys(client.queues);
}

function getQueue(client, queueName) {
	return client.queues[queueName];
}

async function getQueueCategory(client) {
	let queueCategory = client.channels.cache.get(client.config.queueCategory);
	if (!queueCategory) queueCategory = await client.channels.fetch(client.config.queueCategory).catch(() => undefined);
	return queueCategory;
}

async function getQueueChannel(client, queue) {
	let queueChannel = client.channels.cache.get(queue.channel);
	if (!queueChannel) queueChannel = await client.channels.fetch(queue.channel).catch(() => undefined);
	return queueChannel;
}

function isQueueChannelManaged(client, queueChannel) {
	if (queueChannel.parentID === client.config.queueCategory) return true;
	return false;
}

function saveQueue(client, queue) {
	client.queues[queue.name] = queue;
	writeQueues(client.queues);
}

module.exports = { checkQueueMembers, delQueue, delQueueChannel, getQueues, getQueue, getQueueCategory, getQueueChannel, isQueueChannelManaged, saveQueue };
