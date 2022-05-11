const express = require("express");
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getAllProduct);

router
  .route("/products/new")
  .post(isAuthenticateUser, authorizeRoles("admin"), createProduct);

router
  .route("/products/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);


router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticateUser, createProductReview);

router
  .route("/see/reviews")
  .get(getProductReviews)
  .delete(isAuthenticateUser, deleteReview);


module.exports = router;
