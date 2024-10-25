import AdminLayout from '../layouts/Admin';
import UserLayout from '../layouts/User';
import UserExpenses from './Admin/UserExpenses';
import UserExpensesDetail from './Admin/UserExpensesDetail';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ExpenseForm from './Expenses/ExpenseForm';
import ManageCategory from './User/ManageCategory';

const screens = [
  {
    isProtected: false,
    name: 'Login',
    component: Login,
  },
  {
    isProtected: false,
    name: 'Register',
    component: Register,
  },
  {
    isProtected: true,
    name: 'UserHome',
    component: UserLayout,
  },
  {
    isProtected: true,
    name: 'AdminHome',
    component: AdminLayout,
  },
  {
    isProtected: true,
    name: 'ExpenseForm',
    component: ExpenseForm,
  },
  {
    isProtected: true,
    name: 'ManageExpenseCategory',
    component: ManageCategory,
  },
  {
    isProtected: true,
    name: 'UserExpenses',
    component: UserExpenses,
  },
  {
    isProtected: true,
    name: 'UserExpensesDetail',
    component: UserExpensesDetail,
  },
];

export default screens;
