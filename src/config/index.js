import development from './development.config';
import production from './production.config';

const env = window.location.href.includes('localhost') ? 'development' : 'production';

const config = {
  development,
  production,
};

export default config[env];
