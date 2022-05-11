const Order = require("../models/orderModels");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create A Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
 
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
   
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler(`Order not found with this id`, 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders

exports.myOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler(`Order not found with this id`, 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get All Order -- Admin
exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(new ErrorHandler(`Order not found with this id`, 404));
  }

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// update Order Status -- Admin



exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(`Order not found with this id`, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already deliverd this order", 400));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
 

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    order,
    message:"updated successfully"
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product. Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
  

// Delete Order =--Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.findById(req.params.id);

  if (!orders) {
    return next(new ErrorHandler(`Order not found with this id`, 404));
  }

  await Order.remove();

  res.status(200).json({
    success: true,
  });
});
