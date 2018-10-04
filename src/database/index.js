import Sequelize from 'sequelize';
import config from './config/config';

const envConfig = config[process.env.NODE_ENV || 'development'];// eslint-disable-line no-undef
const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);

const models = {
	Goal: sequelize.import('./models/goal'),
	Milestone: sequelize.import('./models/milestone'),
	Factor: sequelize.import('./models/factor'),
	Contributor: sequelize.import('./models/contributor')
};

Object.keys(models).forEach(modelName => {
	if (models[modelName].associate) {
		models[modelName].associate(models);
	}
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;