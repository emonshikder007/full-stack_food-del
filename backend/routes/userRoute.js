import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", authMiddleware, (req, res) => {
  return res.json({ success: true, userId: req.body.userId });
});
userRouter.get("/list", async (req, res) => {
  try {
    const users = await userModel.find({}, "name email _id");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});


export default userRouter;
