import startServer from '../server/config/server';

/**
 * @function setup the environment host where to go on testing session
 */

export const setup = async () => {
  await startServer();
  process.env.TEST_HOST = `http://localhost:${3500}`;
};
