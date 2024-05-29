import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import jobs from "./data/jobsdata.js"; 
import users from "./data/users.js";
import Jobs from "./models/jobsModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async()=>{
    try{
        await Jobs.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const recruiterUser = createdUsers[0]._id

        const sampleJobs = jobs.map(job =>{
            return {...job, user:recruiterUser, employmentStatus : 'Full time',
            jobLocation: 'london' }
        })

        await Jobs.insertMany(sampleJobs);
        
        console.log("DATA IMPORTED".green.inverse);
        process.exit();
    }catch(e){
            console.error(`${e.message}`.red.inverse);
            process.exit(1);
    }
}

const destroyData = async() =>{
    try{
        await Jobs.deleteMany();
        await User.deleteMany();

        console.log("DATA DESTROYED".green.inverse);
        process.exit();
    }catch(e){
        console.error(`${e.message}`.red.inverse);
        process.exit(1);

    }
}

if (process.argv[2]=== '-d'){
    destroyData();
}else{
    importData();
}
