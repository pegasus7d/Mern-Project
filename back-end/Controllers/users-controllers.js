const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User=require("../models/user");
const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = async(req, res, next) => {
  let users;
  try{
    users = await User.find({},'-password');
  }catch(err){
    error=new HttpError("Fetching Users failed , Please try again later",500)
    return next(error);
  } 
  res.json({users:users.map(user=>user.toObject({getters:true}))})
 
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next( new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { name, email, password ,places} = req.body;
  let existingUser;
  try{
    existingUser= await User.findOne({email:email});
  }catch(err){
    const error=new HttpError(
      "Signing up failed, Please try again later",500
    );
    return next(error);

  }

  if(existingUser){
    const error=new HttpError("User exists already, please Login instead",422);
    return next(error);
  }
  

  const createdUser = new User({
    name,
    email,
    image:"https://upload.wikimedia.org/wikipedia/commons/3/38/Hogwarts_model_studio_tour.jpg",
    password,
    places
  });


  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Creating User Failed , please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({getters:true})});
  

  
};

const login = async(req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try{
    existingUser= await User.findOne({email:email});
  }catch(err){
    const error=new HttpError(
      "Logging in failed, Please try again later",500
    );
    return next(error);

  }


  if(!existingUser || existingUser.password !== password){
    const error=new HttpError(
      "Invalid Credentials,could not log you in ",401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
