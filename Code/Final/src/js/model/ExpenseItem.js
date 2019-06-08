import { topics, publish } from '../util/topic';

let uid = 1;

export default class ExpenseItem {
	constructor() {
		this.uid = uid++;
		this._date = new Date();
		this._amount = 0;
		this._description = '';

		Object.defineProperties(this, {
			uid: {
				value: uid++
			},
			date: {
				get: function () {
					return this._date;
				},
				set: function (value) {
					this._date = value;
					publish(topics.expenseReport.item.update);
					publish(topics.expenseReport.item.update + '/' + this.uid, this);
				}
			},
			description: {
				get: function () {
					return this._description;
				},
				set: function (value) {
					this._description = value;
					publish(topics.expenseReport.item.update);
					publish(topics.expenseReport.item.update + '/' + this.uid, this);
				}
			},
			amount: {
				get: function () {
					return this._amount;
				},
				set: function (value) {
					this._amount = value;
					publish(topics.expenseReport.item.update);
					publish(topics.expenseReport.item.update + '/' + this.uid, this);
				}
			}
		})
	}
};
