import Axios from 'axios';
import startServer from '../../server/config/server';
import { Application } from 'express';
import { GracefulShutdownManager } from '@moebius/http-graceful-shutdown';
import { Server } from 'http';

let app: Application | Server;
let shutdownManager: GracefulShutdownManager;

beforeAll(async () => {
  app = await startServer(true);
  shutdownManager = new GracefulShutdownManager(app as Server);
  await Axios.post('http://localhost:3500/user', {
    username: 'StrangeGuy77',
    email: 'jhonatanrg@live.com',
    password: '1234',
  });
});

afterAll(async () => {
  shutdownManager.terminate(() => null);
});

const login = async (email: string, password: string, equalObject: any) => {
  const { data } = await Axios.post('http://localhost:3500/user/login', {
    email,
    password,
  });
  return expect(data).toMatchObject(equalObject);
};

describe('Testing login controller response to everything.', () => {
  test('Check for any of both empty fields: email or password.', async () => {
    try {
      await login('', '', {
        message:
          'There are fields that are compulsory for login and are not within the body. Check email or password fields.',
      });
    } catch (error) {
      console.log(error);
    }
  });

  test('Check for bad email pattern', async () => {
    try {
      await login('asdas', 'asdads', {
        message: "The email you've sent is not valid. Check the correct email structuration: test@test.com",
      });
    } catch (error) {
      console.log(error);
    }
  });

  test('Check for invalid email', async () => {
    try {
      await login('jhonatanrg@l.com', 'asdsd', {
        message: 'Incorrect email or password',
      });
    } catch (error) {
      console.log(error);
    }
  });

  test('Check for invalid password', async () => {
    try {
      await login('jhonatanrg@live.com', 'asdsd', {
        message: 'Incorrect email or password',
      });
    } catch (error) {
      console.log(error);
    }
  });
  test('Check succesful login', async () => {
    await login('jhonatanrg@live.com', '1234', {
      message: 'Succesfully logged in',
    });
  });
});
