import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';



const appliedJobsSchema = mongoose.Schema({
  job:{type: mongoose.Schema.Types.ObjectId,required: true,ref: "Jobs"},
  company:{type: String,required: true},
  title: {type: String,required: true},
  createdAt: { type: Date},
},{timestamps: true})

const userSchema = mongoose.Schema(
  {
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    isRecruiter: {type: Boolean,required: true,default: false},
    firstName: {type: String,default:''},
    lastName: {type: String,default:''},
    mobileNumber: {type: String,default:''},

    portfolio: {type: String, default:''},
    about: {type: String,  default:''},
    address: {type: String,  default:''},
    company: {type: String,  default:''},
    designation: {type: String,  default:''},

    education: {type: String,  default:''},
    skills: {type: String,  default:''},
    projects: {type: String,  default:''},
    experience: {type: String,  default:''},

    appliedJobs: [appliedJobsSchema],

  },
  {
    timestamps: true,
  }
);

//Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;