import { Router, Request, Response } from 'express';
import { getPayments, RegisterPayment } from '../../../modules/payment/PaymentController';

const router = Router();

router
  .route('/payment')
  .get(getPayments)
  .post(RegisterPayment)
  .all((req: Request, res: Response) =>
    res.send(
      `The route "${
        req.originalUrl
      }" you're trying to access with the "${req.method.toUpperCase()}" has no available controllers or binded routes`
    )
  );

export default router;
