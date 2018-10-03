import * as path from "path";

let config: any = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'DIRTY_SEVEN';
config.serverPort = process.env.serverPort || 3000;
config.webSocketServerPort = process.env.webSocketServerPort || 3001;
config.JWTSecret = process.env.JWTSecret || 'myVerySecretKey';
config.corsOptions = {
    allowedHeaders: 'token',
}
export default config;