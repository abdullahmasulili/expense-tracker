import AdminLayout from '../layouts/Admin';
import UserLayout from '../layouts/User';
import UserExpenses from './Admin/UserExpenses';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ExpenseForm from './Expenses/ExpenseForm';
import ManageCategory from './User/ManageCategory';

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
    name: 'AdminHome',
    component: AdminLayout,
  },
  {
    name: 'ExpenseForm',
    component: ExpenseForm,
  },
  {
    name: 'ManageExpenseCategory',
    component: ManageCategory,
  },
  {
    name: 'UserExpenses',
    component: UserExpenses,
  },
];

export default screens;
