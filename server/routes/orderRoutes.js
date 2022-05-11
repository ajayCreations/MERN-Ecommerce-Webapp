const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticateUser, newOrder);

router.route("/order/:id").get(isAuthenticateUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticateUser, myOrder);
router
  .route("/admin/orders")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllOrder);
  
router
  .route("/admin/orders/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"),updateOrder)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
