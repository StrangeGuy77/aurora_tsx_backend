import {
  getRecentSoftwares,
  getOneSoftware,
  deleteASoftware,
} from '../../../modules/querying/HomeQueryingController';
import { uploadSoftware } from '../../../modules/upload/UploadController';
import { Router } from 'express';

const router = Router();

router.route('/softwares').get(getRecentSoftwares);

router.route('/softwares/:userId').post(uploadSoftware);

router.route('/softwares/:softId').get(getOneSoftware).delete(deleteASoftware);

export default router;
