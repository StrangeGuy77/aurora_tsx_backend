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
});

afterAll(async () => {
  shutdownManager.terminate(() => null);
});

describe('Testing home querying and all of its functionalities.', () => {
  test('Getting recent softwares', async () => {});
});
