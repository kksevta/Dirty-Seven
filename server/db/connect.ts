import * as Mongoose from 'mongoose';
import { logError, logInfo } from '../core/logger/app-logger'
import config from '../core/config/config.dev'

const connectToDb = async () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        Mongoose.set('useCreateIndex', true)
        await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
            useNewUrlParser: true
        });
        logInfo('Connected to MongoDB');
    }
    catch (err) {
        logError('Connection Failed to MongoDB');
    }
}

export default connectToDb;