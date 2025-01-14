import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  userController.createUserController,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
  userController.loginUserController,
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.profileUserController,
);

router.get(
  "/logout",
  authMiddleware.authUser,
  userController.logoutUserController,
);

export default router;
