async function delQueue(client, queue) {
	await delQueueChannel(client, queue);
	return client.queues.delete(queue.name);
}

async function delQueueChannel(client, queue) {
	const queueChannel = await getQueueChannel(client, queue);
	if (isQueueChannelManaged(client, queueChannel)) await queueChannel.delete();
}

function getQueues(client) {
	return client.queues.keys();
}

function getQueue(client, queueName) {
	return client.queues.get(queueName);
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
	return client.queues.set(queue.name, queue);
}

module.exports = { delQueue, delQueueChannel, getQueues, getQueue, getQueueCategory, getQueueChannel, isQueueChannelManaged, saveQueue };
