const subscriptions = {};

export function publish(topic, payload) {
	const subs = subscriptions[topic];
	if (subs) {
		subs.forEach((sub) => {
			if (typeof sub === 'function') {
				sub(payload);
			}
		});
	}
};

export function subscribe(topic, callback) {
	if (!subscriptions[topic]) {
		subscriptions[topic] = [];
	}
	if (typeof callback === 'function') {
		subscriptions[topic].push(callback);
	}

	return {
		remove: function () {
			const idx = subscriptions[topic].indexOf(callback);
			if (idx !== -1) {
				subscriptions[topic].splice(idx, 1);
			}
		}
	}
};

export const topics = {
	expenseReport: {
		update: '/expenseReport/update',
		header: {
			update: '/expenseReport/header/update'
		},
		item: {
			update: '/expenseReport/item/update'
		}
	}
}
