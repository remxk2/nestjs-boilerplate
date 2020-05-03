import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

export const testDatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const mongod = new MongoMemoryServer();
      const uri = await mongod.getConnectionString();

      return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    },
  },
];
