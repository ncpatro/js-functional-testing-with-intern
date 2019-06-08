import ExpenseHeaderView from './ExpenseHeaderView';
import ExpenseBodyView from './ExpenseBodyView';
import { subscribe, topics } from '../util/topic';

export default class ExpenseReportView{

	constructor(model, node) {
		this.node = node;
		this.model = model;

		this.headerNode = document.createElement('div');
		node.appendChild(this.headerNode);

		this.bodyNode = document.createElement('div');
		node.appendChild(this.bodyNode);

		this.header = new ExpenseHeaderView(model);
		this.body = new ExpenseBodyView(model);

		this.render();

		subscribe(topics.expenseReport.update, (model) => {
			this.model = model;
			this.render();
		});
	}

	render() {
		const headerNode = this.header.render();
		const bodyNode = this.body.render();

		if (this.headerNode) {
			if (this.headerNode !== headerNode) {
				this.node.replaceChild(headerNode, this.headerNode);
			}
		}
		else {
			this.headerNode = headerNode;
			this.node.appendChild(this.headerNode);
		}

		if (this.bodyNode) {
			if (this.bodyNode !== bodyNode) {
				this.node.replaceChild(bodyNode, this.bodyNode);
			}
		}
		else {
			this.bodyNode = bodyNode;
			this.node.appendChild(this.bodyNode);
		}
	}
}
