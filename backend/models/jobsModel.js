import mongoose from "mongoose"

const appliedCandidatesSchema = mongoose.Schema({
    name: { type: String ,required: true },
    createdAt: { type: Date, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    }},{
    timeStamps:true,
})

const jobSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,required: true,ref: "User"},
    title: {type : String, required: true},
    department: {type : String, required: true},
    company :{type : String, required: true},
    skillsRequired : {type : String, required: true},
    experience : {type : String, required: true},
    minimumQualification : {type : String, required: true},
    companyDescription : {type : String, required: true},
    salaryFrom : {type : Number, required: true},
    salaryTo : {type : Number, required: true},
    smallDescription : {type : String, required: true},
    fullDescription : {type : String, required: true},
    email : {type : String, required: true},
    phoneNumber : {type : String, required: true},
    appliedCandidates : [appliedCandidatesSchema],
    employmentStatus : {type : String, required: true},
    jobLocation: {type : String, required:true},
    
},{
    timestamps : true,
})

const Jobs= mongoose.model('Jobs', jobSchema)

export default Jobs