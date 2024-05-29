import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user and get token
// @route POST /api/users/login
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json(await User.findOne({ email }).select("-password"));
    // res.json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     isRecruiter: user.isRecruiter,
    // })
  } else {
    res.status(401);
    throw new Error("Invalid email or password ");
  }
});

// @desc Register user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isRecruiter } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
      isRecruiter,
    });
    if (user) {
      generateToken(res, user._id);

      res.json(await User.findOne({ email }).select("-password"));

      // res.status(201).json({
      //     _id: user._id,
      //     name: user.name,
      //     email: user.email,
      //     isRecruiter: user.isRecruiter
      // });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc LogOut user and clear cookies
// @route POST /api/users/logout
// @access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "successfully logged out" });
});

// @desc Get user profile
// @route GEt /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(await User.findById(req.user._id).select("-password"));
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isRecruiter = Boolean(req.body.isRecruiter);
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.mobileNumber = req.body.number || user.mobileNumber;
    user.portfolio = req.body.portfolio || user.portfolio;
    user.about = req.body.about || user.about;
    user.address = req.body.address || user.address;
    user.education = req.body.education || user.education;
    user.skills = req.body.skills || user.skills;
    user.projects = req.body.projects || user.projects;
    user.experience = req.body.experience || user.experience;
    user.company = req.body.company || user.company;
    user.designation = req.body.designation || user.designation;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isRecruiter: updatedUser.isRecruiter,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      mobileNumber: updatedUser.mobileNumber,
      portfolio: updatedUser.portfolio,
      about: updatedUser.about,
      address: updatedUser.address,
      education: updatedUser.education,
      skills: updatedUser.skills,
      projects: updatedUser.projects,
      experience: updatedUser.experience,
      company: updatedUser.company,
      designation: updatedUser.designation,
    });

    // res.status(200).json({
    //         _id: updatedUser._id,
    //         name: updatedUser.name,
    //         email: updatedUser.email,
    //         isAdmin: updatedUser.isAdmin
    // });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

// @desc Get all user for Admin
// @route GET /api/users
// @access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc Delete user by ID
// @route DELETE /api/users/:id
// @access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user
// @route PUT /api/users/:id
// @access private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isRecruiter = Boolean(req.body.isRecruiter);
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.mobileNumber = req.body.number || user.mobileNumber;
    user.portfolio = req.body.portfolio || user.portfolio;
    user.about = req.body.about || user.about;
    user.address = req.body.address || user.address;
    user.education = req.body.education || user.education;
    user.skills = req.body.skills || user.skills;
    user.projects = req.body.projects || user.projects;
    user.experience = req.body.experience || user.experience;
    user.company = req.body.company || user.company;
    user.designation = req.body.designation || user.designation;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  updateUserProfile,
  getUserById,
  deleteUser,
  updateUser,
};
