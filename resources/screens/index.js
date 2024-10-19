import UserLayout from '../layouts/User';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ExpenseForm from './Expenses/ExpenseForm';

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
    name: 'UserHome',
    component: UserLayout,
  },
  {
    name: 'ExpenseForm',
    component: ExpenseForm,
  },
];

export default screens;
