import development from './development.config';
import production from './production.config';

const env = window.location.href.includes('localhost') ? 'development' : 'production';
console.log(window.location.href.includes('localhost'));

const config = {
  development,
  production,
};

export default config[env];
