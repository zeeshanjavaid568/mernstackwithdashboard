const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const uploadFile = require("../middlewares/file-upload-middleware");

//TODO: USERS API CRUD START
router.route("/users").get(authMiddleware, adminController.getAllUsers);
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserDataById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUser);
//TODO: USERS API CRUD END

//TODO: CONTACTS API CRUD START
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router
  .route("/contacts/:id")
  .get(authMiddleware, adminMiddleware, adminController.getContactById);
router
  .route("/contacts/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    adminController.updateContactDataById
  );
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContact);
//TODO: USERS API CRUD END

//TODO: SERVICES API CRUD START
router
  .route("/services")
  .get(authMiddleware, adminMiddleware, adminController.getAllServices);
router
  .route("/Services/:id")
  .get(authMiddleware, adminMiddleware, adminController.getServicesById);
router
  .route("/services/update/:id")
  .patch(
    authMiddleware,
    adminMiddleware,
    adminController.updateServicesDataById
  );
router
  .route("/services/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteServices);
//TODO: SERVICES API CRUD END

module.exports = router;
