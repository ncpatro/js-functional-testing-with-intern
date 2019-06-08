import * as template from './templates/ExpenseHeaderView.ejs';
import { toDateString, toYMD } from '../util/date';
import { subscribe, topics } from '../util/topic';

export default class ExpenseHeaderView {
    constructor(model) {
        this.model = model;

        this.node = document.createElement('div');

        subscribe(topics.expenseReport.header.update, (model) => {
            this.model = model;
            this.render();
        });
    }

    render() {
        this.node.innerHTML = template({
            model: this._createViewModel(this.model)
        });

        return this.node;
    }

    _createViewModel(model) {
        return {
            employeeId: model.employeeId,
            firstName: model.firstName,
            lastName: model.lastName,
            createdDate: toDateString(model.createdDate),
            lastModified: toDateString(model.lastModifiedDate),
            startDate: toYMD(model.startDate),
            endDate: toYMD(model.endDate),
            description: model.description,
            department: model.department
        };
    }
}
