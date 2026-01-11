import { NextFunction, Request, Response } from "express";

const signupValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log("---------I am inside the signupValidator---------");
  if (!req.body.email) {
    return res.status(400).json({
      message: "Email are required",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: "Password are required",
    });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "Name are required" });
  }

  next();
};

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log("---------I am inside the loginValidator---------");
  const { email, password } = req.body;
  console.log({ email, password });

  if (!email) {
    return res.status(400).json({ message: "Email are required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password are required" });
  }

  next();
};

export { signupValidator, loginValidator };
