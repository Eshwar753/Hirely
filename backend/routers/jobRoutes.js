import express from 'express';
import  {getJobById, getJobs,  getCreateJob, getPostedJobsById, updateJobById, applyJobById} from '../controller/jobController.js'
import { protect, recruiter } from '../middleware/authMiddleware.js';

const router = express.Router(); 


router.route('/').get(getJobs).post(protect,recruiter, getCreateJob)
router.route('/:id').get(getJobById).put(protect, recruiter, updateJobById)
router.route('/posted/:id').get(protect, recruiter, getPostedJobsById)
router.route('/:id/apply').put(protect,applyJobById)



export default router;