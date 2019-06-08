import ExpenseItem from './ExpenseItem';

export default class ExpenseReport {

	constructor() {
		this.employeeId = 0;
		this.firstName = '';
		this.lastName = '';
		this.createdDate = new Date();
		this.lastModifiedDate = new Date();
		this.startDate = new Date();
		this.endDate = new Date();
		this.description = '';
		this.department = '';
		this.items = [];
	}

	addItem() {
		this.items.push(new ExpenseItem());
		return this.items[this.items.length - 1];
	}

	deleteItem(item) {
		for (let i = 0; i < this.items.length; i++) {
			if (item === this.items[i]) {
				this.items.splice(i, 1);
				break;
			}
		}
	}
};
