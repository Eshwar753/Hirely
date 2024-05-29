import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Recruiter 1',
    email: 'recruiter1@email.com',
    password: bcrypt.hashSync('123456', 10),
    isRecruiter: true,
    firstName: 'Name',
    lastName: 'one',
    mobileNumber: '9635824710',
  },
  {
    name: 'Recruiter 2',
    email: 'recruiter2@email.com',
    password: bcrypt.hashSync('123456', 10),
    isRecruiter: true,
    firstName: 'Name',
    lastName: 'one',
    mobileNumber: '9635824710',
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
    isRecruiter: false,
    firstName: 'Jhon',
    lastName: 'doe',
    mobileNumber: '9635824710',
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
    isRecruiter: false,
    firstName: 'Jane',
    lastName: 'doe',
    mobileNumber: '9635824710',
  },
];

export default users;

