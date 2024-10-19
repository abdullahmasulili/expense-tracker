import Login from './Auth/Login';
import Register from './Auth/Register';
import ExpenseForm from './Expenses/ExpenseForm';
import ExpensesHome from './Expenses/Home';

const screens = [
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Register',
    component: Register,
  },
  {
    name: 'Expenses',
    component: ExpensesHome,
  },
  {
    name: 'ExpenseForm',
    component: ExpenseForm,
  },
];

export default screens;
