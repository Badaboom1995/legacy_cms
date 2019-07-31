import development from './development.config';
import production from './production.config';

const env = process.env.NODE_ENV || 'development';
console.log('processEnv: ', process.env.NODE_ENV);

const config = {
  development,
  production,
};

export default config[env];
