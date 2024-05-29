import asyncHandler from 'express-async-handler';
import Jobs from '../models/jobsModel.js';
import User from '../models/userModel.js';
import { response } from 'express';


// @desc Fetch all jobs
// @route GET /api/jobs
// @access public

const getJobs= asyncHandler(async (req, res) => {



  const keyword = req.query.keyword ? {title: {$regex: req.query.keyword, $options: 'i'}} : {} ;
  let jobs = await Jobs.find({...keyword});


    res.json(jobs);
  });

  // @desc Fetch single product with ID
// @route GET /api/jobs/:id
// @access public

  const getJobById= asyncHandler(async (req, res) => {
    console.log('getJob by id')
    const job = await Jobs.findById(req.params.id);

    res.json(job);
  });


  // @desc create job
// @route GET /api/jobs
// @access public

const getCreateJob= asyncHandler(async (req, res) => {
    
  const { title,department,experience,minimumQualification,salaryFrom,
    salaryTo,skillsRequired,smallDescription,fullDescription,company, phoneNumber,companyDescription,
  email,jobLocation,employmentStatus } = req.body;

  const user= req.user._id

  const newJob = new Jobs({
    user:user,
    title,department,experience,minimumQualification,salaryFrom,
    salaryTo,skillsRequired,smallDescription,fullDescription,company, phoneNumber,companyDescription,
  email,jobLocation,employmentStatus}
  )
  await newJob.save();
  if (newJob){
  res.status(201).json('job created successfully');
  }else{
    res.status(400);
 throw new Error("Invalid data");
  }
});

// @desc Fetch all Jobs created by a user with ID
// @route GET /api/jobs/posted/:id
// @access private

const getPostedJobsById= asyncHandler(async (req, res) => {
  const UserId= req.params.id;
  const jobs = await Jobs.find({user: UserId});

  res.json(jobs);
});

const updateJobById= asyncHandler(async (req, res) => {
  
  const job = await Jobs.findById(req.params.id);

  
  if (job){
    job.user = req.user;
    job.title = req.body.title || job.title;
    job.department = req.body.department || job.department;
    job.experience = req.body.experience || job.experience;
    job.salaryFrom = req.body.salaryFrom || job.salaryFrom;
    job.salaryTo = req.body.salaryTo || job.salaryTo;
    job.minimumQualification = req.body.minimumQualification || job.minimumQualification;
    job.skillsRequired = req.body.skillsRequired || job.skillsRequired;
    job.smallDescription = req.body.smallDescription || job.smallDescription;
    job.fullDescription = req.body.fullDescription || job.fullDescription;
    job.company = req.body.company || job.company;
    job.phoneNumber = req.body.phoneNumber || job.phoneNumber;
    job.companyDescription = req.body.companyDescription || job.companyDescription;
    job.jobLocation = req.body.jobLocation || job.jobLocation;
    job.employmentStatus = req.body.employmentStatus || job.employmentStatus; 
    job.email = req.body.email || job.email; 
  }

  const updatedJob = await job.save();

  res.status(200).json(updatedJob);
});

// @desc Fetch all Jobs created by a user with I
// @route GET /api/jobs/posted/:id
// @access private

const applyJobById= asyncHandler(async (req, res) => {
  const userId= req.user._id;
  console.log(userId);
  const job = await Jobs.findById(req.params.id);
  const user = await User.findById(userId);


  if (!job && !user) {
    res.status(404)
    throw new Error("data not found")
  }

  else{
    console.log("inside else")
    const appliedCandidateDetails = {
      name: req.body.name,
      user: req.user._id,
      createdAt: Date.now(),
    }
    job.appliedCandidates.push(appliedCandidateDetails)

    const jobDetails= {
      company: req.body.company,  
      title: req.body.title,
      job: req.params.id,
      createdAt: Date.now(),
    }
    user.appliedJobs.push(jobDetails)

await job.save();
await user.save();

  }
  


  res.status(201).json(job);
});



  export {getJobById, getJobs, getCreateJob, getPostedJobsById, updateJobById, applyJobById};