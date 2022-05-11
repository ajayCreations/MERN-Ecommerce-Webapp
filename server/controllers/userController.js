const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/JWTtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "mern is awesome",
      url: "profile avatar",
    },
  });

  sendToken(user, 201, res);
});

// Login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has givne passwrod and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or passord", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Passwords

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not found", 404));
  }

  // Get Reset Password Token.
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you haven't requested this email then please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password does not matched! check again. ", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get User Details

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
    return next(new ErrorHandler("Old password is incorrect"),400);
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match",400)); 
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user,200,res)    
  // res.status(200).json({
  //   success: true,
  //   user,
  // });
});

exports.updateUserProfile=catchAsyncErrors(async(req,res,next)=>{
  
  const newUserData={
    name:req.body.name,
    emai:req.body.email,

  }

  // we will add cloudnar later

  const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })

  res.status(200).json({
    success:true
  })

})

// Get all user (admin)

exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
  const users = await User.find();

  res.status(200).json({
    success:true,
    users,
  })
})


// Get Single user (admin)

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
  }

  res.status(200).json({
    success:true,
    user,

  })

})


//Update user role - by admin 

exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role
  
  }


  const user = await User.findByIdAndUpdate(req.params.id,newUserData);

  if(!user){
    return next(new ErrorHandler(`User dosen't exists with id ${req.params.id}`,400))
  }

  res.status(200).json({
    success:true,

  })


})



//Delete user role - by admin 

exports.deleteUserRole=catchAsyncErrors(async(req,res,next)=>{
 
  const user= await User.findById(req.params.id);


  if(!user){
    return next(new ErrorHandler(`User dosen't exists with id ${req.params.id}`,400))
  }


  await user.remove();

  res.status(200).json({
    success:true,
    message:'user deleted successfully !'
    
  })


})

