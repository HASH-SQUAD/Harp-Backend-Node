'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, {
		host: config.host,
		dialect: config.dialect,
		timezone: '+09:00',
		port: config.port,
	});
}

// 모델 파일들을 읽어서 db 객체에 추가
const modelFiles = fs
	.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	});

// 모델 로드 순서 정의
const modelOrder = ['Users', 'Community', 'Commnets'];

// 정의된 순서대로 모델 로드
modelOrder.forEach(modelName => {
	const modelFile = modelFiles.find(file => file.startsWith(modelName.toLowerCase()));
	if (modelFile) {
		const model = require(path.join(__dirname, modelFile))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	}
});

// 나머지 모델 파일들 로드
modelFiles
	.filter(file => !modelOrder.some(model => file.startsWith(model.toLowerCase())))
	.forEach(file => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

// 관계 설정
Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// 데이터베이스 동기화 함수
db.sync = async () => {
	try {
		// 순서대로 테이블 생성
		for (const modelName of modelOrder) {
			await db[modelName].sync();
			console.log(`${modelName} table synchronized`);
		}

		// 나머지 테이블 생성
		const remainingModels = Object.keys(db)
			.filter(model => !modelOrder.includes(model) && model !== 'sequelize' && model !== 'Sequelize');

		for (const modelName of remainingModels) {
			await db[modelName].sync();
			console.log(`${modelName} table synchronized`);
		}

		console.log('All tables synchronized successfully');
	} catch (error) {
		console.error('Error synchronizing database:', error);
		throw error;
	}
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;