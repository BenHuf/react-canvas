const User = require("../models/User")
const jwt = require("jsonwebtoken")
const cookie = require("cookie")
const bcrypt = require("bcrypt")
const connection = require("../config/connection")

require("dotenv").config()

const createUser = async (req, res) => {
  try {
    const createQuery = await User.create(req.body);
    res.status(200).json(sample);
  } catch(err) {
    res.status(400).json({ message: 'Unable to create user' });
  }
}
  
const getAllUsers = async (req, res) => {
  try {
    const getAllQuery = await User.find({});
    res.status(200).json({ result: "success", payload: getAllQuery });
  } catch(err) {
    res.status(400).json({ message: 'No users found' });
  }
}

const getUserById = async (req, res) => {
  try {
    const getByIdQuery = await User.findById(req.params.id)
    res.status(200).json({ result: "success", payload: getByIdQuery })
  } catch(err) {
    res.status(400).json({ result: "fail", message: 'No user found by that id' })
  }
}

const authenticateLogin = async (req, res) => {
  // First see if we have a user with the supplied email address 
  const foundUser = await User.findOne({ email: req.body.email })
  if( !foundUser ) return res.status(401).json({ message: "Login failed." })

  // Now compare the supplied password w/ the hashed password
  const isValid = await bcrypt.compare(req.body.password, foundUser.password)
  if( !isValid ) return res.status(401).json({ message: "Login failed." })

  // If we have a match, we will send back a token (line 43 extracts the password key from the foundUser object)
  const { password, ...modifiedUser } = foundUser

  // Create a token to represent the authenticated user
  const token = jwt.sign({ _id: foundUser._id, email: foundUser.email}, process.env.JWT_SECRET)

  res
    .status(200)
    .set({ "auth-token": token })
    .json({ result: "success", user: modifiedUser, token: token })
}

const lookupUserByToken = async (req, res) => {
  if( !req.headers || !req.headers.cookie ) return res.status(401).json({msg: "un-authorized"})

  // The node package named cookie will parse cookies for us
  const cookies = cookie.parse(req.headers.cookie)

  // Get the token from the request headers & decode it 
  const token = cookies["auth-token"]  //cookies.authToken
  if( !token ) return res.status(401).json({msg: "un-authorized"})
  
  // Look up the user from the decoded token
  const isVerified = jwt.verify(token, process.env.JWT_SECRET)
  if( !isVerified ) return res.status(401).json({msg: "un-authorized"})

  const user = await User.findById(isVerified._id)
  if( !user ) return res.status(401).json({msg: "un-authorized"})

  return res.status(200).json({ result: "success", payload: { _id: user._id, email: user.email } })
}

module.exports = { 
  createUser,
  getAllUsers,
  getUserById,
  authenticateLogin,
  lookupUserByToken
}