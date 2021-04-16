import { Application, Router } from "express";
import SoftwareRouter from "./software/index.routes";
import UserRouter from "./user/index.routes";
import PaymentRouter from "./addon/index.routes";
import { defaultRouteAnswer } from "../../modules/querying/HomeQueryingController";

const router = Router();

export default (app: Application) => {
  router.route("/").all(defaultRouteAnswer);

  router.use(SoftwareRouter);
  router.use(UserRouter);
  router.use(PaymentRouter);

  app.use(router);

  return app;
};
