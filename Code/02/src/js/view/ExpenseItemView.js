import * as template from './templates/ExpenseItemView.ejs';
import { toYMD } from '../util/date';
import * as currency from '../util/currency';
import { topics, subscribe } from '../util/topic';

export default class ExpenseItemView {
    constructor(model, deleteListener) {
        this.model = model;
        this.deleteListener = deleteListener;

        this.node = document.createElement('table');

        subscribe(topics.expenseReport.item.update + '/' + this.model.uid, (model) => {
            this.model = model;
            this._renderUpdate();
        });

        this._createActions();
    }

    getAmount() {
        return this.model.amount || 0;
    }

    render(rowNum) {

        this.node.innerHTML = template({
            model: this._createViewModel(this.model),
            rowNum
        });

        this.node.querySelector('.actions').appendChild(this.deleteButton);

        this.row = this.node.querySelector('tr');

        this._addListeners(this.row);

        return this.row;
    }

    _addListeners(row) {
        row.addEventListener('change', (e) => {
            switch(e.target.dataset['field']) {
                case 'date':
                    this.model.date = new Date(e.target.value);
                    break;
                case 'amount':
                    this.model.amount = parseFloat(e.target.value);
                    break;
                case 'description':
                    this.model.description = e.target.value;
                    break;
            }
        });
    }

    _createViewModel(model) {
        return {
            uid: model.uid,
            date: toYMD(model.date),
            description: model.description,
            amount: currency.toString(model.amount)
        };
    }

    _createActions() {
        this.deleteButton = document.createElement('button');
        this.deleteButton.innerHTML = 'Delete';
        this.deleteButton.addEventListener('click', () => {
            this._deleteRow();
        });

    }

    _deleteRow() {
        this.deleteListener && this.deleteListener();
        this.model.delete();
    }

    _renderUpdate() {
        console.log(this.model);
        this.row.querySelector('[data-field=amount]').value = currency.toString(this.model.amount);
        this.row.querySelector('[data-field=description]').value = this.model.description;
        this.row.querySelector('[data-field=date]').value =toYMD(this.model.date);
    }
}
