import express from 'express'
const router = express.Router();
import { getDailyLogs, createTask, updateTaskProgress} from '../controller/DayLogController.js'
import protect from '../middlewares/Auth.js'


router.route('/alltask').get(getDailyLogs);
router.route('/createtask').post(protect, createTask);
router.route('/task/:dayId/:taskId').patch(protect, updateTaskProgress);

export default router;
