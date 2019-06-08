import ExpenseReport from './model/ExpenseReport';
import ExpenseReportView from './view/ExpenseReportView';
import '../app.css';

function initialize(node) {
    const report = new ExpenseReport();
    const view = new ExpenseReportView(report, node);
}

const root = document.createElement('div');
document.body.appendChild(root);
initialize(root);
