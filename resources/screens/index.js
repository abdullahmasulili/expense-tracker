import Login from './Auth/Login';
import Register from './Auth/Register';
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
];

export default screens;
