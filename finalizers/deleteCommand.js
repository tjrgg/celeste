const { Finalizer } = require('klasa');

module.exports = class extends Finalizer {

	async run(msg) {
		if (msg.deletable) await msg.delete();
	}

};
