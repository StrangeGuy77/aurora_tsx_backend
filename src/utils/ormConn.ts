import { createConnection, getConnectionOptions } from 'typeorm';

/**
 * @returns a TypeORM connection with database.
 */
export const createTypeOrmConn = async () => {
  const connOpts = await getConnectionOptions(process.env.NODE_ENV);
  return await createConnection({ ...connOpts, name: 'default' });
};
