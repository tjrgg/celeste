const fs = require('fs');

function readQueues() {
	try {
		const file = fs.readFileSync(`${process.cwd()}/config/queues.json`);
		const queues = JSON.parse(file);
		return queues;
	}
	catch (error) {
		if (error.code === 'ENOENT') writeQueues({});
		return {};
	}
}

function writeQueues(queues) {
	try {
		fs.writeFileSync(`${process.cwd()}/config/queues.json`, JSON.stringify(queues));
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = { readQueues, writeQueues };
