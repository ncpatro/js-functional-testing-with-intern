import * as template from './templates/ExpenseBodyView.ejs';
import ExpenseItemView from './ExpenseItemView';
import * as currency from '../util/currency';
import { topics, subscribe } from '../util/topic';

export default class ExpenseBodyView {
    constructor(model) {
        this.model = model;
        this.node = document.createElement('div');
        this.items = [];

        this._createActions();

        subscribe(topics.expenseReport.item.update, () => {
            this._updateSumCell();
        });
    }

    render() {
        this.node.innerHTML = template(this.model);

        const actionCell = this.node.querySelector('.actions');
        actionCell.appendChild(this.addButton);

        this.tableBody = this.node.querySelector('table.body tbody');

        if (this.items.length === 0) {
            this._addRow();
        }

        this._updateSumCell();

        return this.node;
    }

    _addRow() {
        const itemModel = this.model.addItem();
        const itemView = new ExpenseItemView(itemModel, () => {
            for (let i = 0; i < this.tableBody.rows.length; i++) {
                if (this.tableBody.rows[i].dataset['uid'] == itemModel.uid) {
                    this.tableBody.deleteRow(i);
                    break;
                }
            }

            this.items.forEach((item, i) => {
                if (item === itemView) {
                    this.model.deleteItem(item);
                    this.items.splice(i, 1);
                }
            });

            this._renumberRows();
        });
        this.items.push(itemView);
        const itemNode = itemView.render(this.items.length);
        this.tableBody.appendChild(itemNode);
    }

    _calcSum() {
        return this.items.reduce((sum, item) => {
            console.log(item);
            return sum + item.getAmount();
        }, 0);
    }

    _createActions() {
        this.addButton = document.createElement('button');
        this.addButton.innerHTML = "Add";
        this.addButton.addEventListener('click', () => {
            this._addRow();
        });
    }

    _renumberRows() {
        for (let i = 0; i < this.tableBody.rows.length; i++) {
            this.tableBody.rows[i].querySelector('.row-num').innerHTML = i + 1;
        }
    }

    _updateSumCell() {
        this.node.querySelector('.sum').innerHTML = currency(this._calcSum());
    }
}
