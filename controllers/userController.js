const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();
const User =require('../models/User');


// Controller for creating new user
exports.createUser = async (req, res) => {
  const {
     name,
     idno,
     email,
     phone,
     password,
     isadmin,
     image
   } = req.body;

  

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email },{phone},{idno});
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    idno,
    email,
    phone,
    password:  hashedPassword,
    isadmin,
    image
   });
  await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  
    // Return success response with the token
    res.status(201).json({ message: 'User created successfully', user: newUser, token });
  };


// Controller for login new user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

 
  // Find user with the given email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the provided password with the stored password
  const isMatch = await bcrypt.compare(password.toString(), user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Return success response with the token
  res.json({ message: 'Logged in successfully', token });
};

// Controller for updating  user
exports.updateUser = async (req, res) => {
  const { name, idno, email, phone, password, isadmin } = req.body;

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.id!== req.user.id) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Hash the password if it is provided
  let hashedPassword = password;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Update the user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, {
    name,
    idno,
    email,
    phone,
    password: hashedPassword,
    isadmin,
  });

  // Return success response
  res.status(200).json({ message: 'User updated successfully', user: updatedUser });
};

// Controller for creating reset password user
exports.resetPasswod = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  

  // Check if passwords match
  if (password!== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Find user with the given email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user
  user.password = hashedPassword;
  await user.save();

  // Return success response
  res.status(200).json({ message: 'Password reset successfully' });
};

// Controller for getting all user
exports.getAllUser = async (req, res) => {
  // Find all users
  const users = await User.find();

  // Return success response
  res.status(200).json({ message: 'Users retrieved successfully', users });
};

// Controller for promoting users to Admin

// Controller for promoting users to Admin
exports.promoteAdmin = async (req, res) => {
  const { userId } = req.body;

 

  // Find user with the given ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Promote the user to admin
  user.isadmin = true;
  await user.save();

  // Return success response
  res.status(200).json({ message: 'User promoted to admin successfully' });
};

// Controller for demomote Admin

// Controller for demomote Admin
exports.demoteAdmin = async (req, res) => {
  const { userId } = req.body;

 
  // Find user with the given ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Demote the user from admin
  user.isadmin = false;
  await user.save();

  // Return success response
  res.status(200).json({ message: 'User demoted from admin successfully' });
};
// Get the user from the request object
exports.getProfile = async (req, res) => {
 try {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User retrieved successfully', user });
  
 } catch (error) {
  return res.status(404).json({ message: 'User not found' });
  
 }
};

// generate a reset password
exports.resetPasswod=async (req, res) => {
 
  const { email, password, confirmPassword } = req.body;

  // Check if email, password, and confirm password are provided
  if (!email ||!password ||!confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // Check if passwords match
  if (password!== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password
  user.password = hashedPassword;
  await user.save();

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Send the new password and token to the user
  // You can use an email service to send the new password to the user
  console.log(`New password: ${password}`);
  console.log(`Token: ${token}`);

  res.status(200).json({ message: 'Password reset successfully' });
}