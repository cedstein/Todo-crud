import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getLoggedInUser = async (req: Request) => {
  const token = req.cookies["login"];
  if (!token) throw new Error("You are not logged in");

  const user = jwt.decode(token);
  if (!user) throw new Error("You are not logged in");

  const foundUser = await User.findOne({
    email: (user as UserDTO).email,
  });

  if (!foundUser) throw new Error("Impersonating a user are we???");

  return foundUser;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getLoggedInUser(req);
    next();
  } catch {
    res.status(401).json({ message: "You are not logged in" });
  }
};

/* ---------------------------------------------------
version 2/: */

/* import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs";

export const getLoggedInUser = async (
  req: Request,
  /* res: Response,
  next: NextFunction, */
/* ) => {
  const token = req.cookies["login"];
  if (!token) {
    res.status(401).send("You are not logged in");
    return;
  }

  const user = jwt.decode(token);
  if (!user) {
    res.status(401).send("You are not logged in");
    return;
  }

  const foundUser = await User.findOne({
    email: (user as UserDTO).email,
  });

  if (!foundUser) {
    res.status(403).send("Impersonating a user are we???");
    return;
  }

  
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getLoggedInUser(req, res, next);
    next();
  } catch {
    res.status(401).send("You are not logged in");
  }
};
 */

/*
------------------------------------------------------------------
first version

import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { UserDTO } from "../models/DTO/UserDTO.mjs";
import { User } from "../models/UserSchema.mjs"; */

/* export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["login"];
    if (!token) {
      res.status(401).send("You are not logged in");
    } else {
      const user = jwt.decode(token);
      if (!user) {
        res.status(401).send("You are not logged in");
      } else {
        const foundUser = await User.findOne({
          email: (user as UserDTO).email,
        });

        if (foundUser) {
          next();
        } else {
          res.status(403).send("Impersonating a user are we???");
        }
      }
    }
  } catch (error) {
    res.status(401).send("You are not logged in");
  }
}; */
