import { Request, Response } from "express";
import { errorHandler, generateToken, responseHandler } from "../utils";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByEmailService,
  getUserByIdService,
  updateUserService,
} from "../models";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body;
    const existingUser = await getUserByEmailService({ email });

    if (existingUser) {
      return responseHandler(res, 400, "The user already exists", existingUser);
    }

    if (!password) {
      return responseHandler(res, 400, "Problem with password", null);
    }

    const user = await createUserService({
      fullName,
      phoneNumber,
      email,
      password,
    });
    return responseHandler(res, 201, "User created succesfully", user);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService({ email });

    if (!user) {
      return responseHandler(res, 401, "Can not find user with this email");
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      return responseHandler(res, 401, "The credentials are invalid");
    }

    const token = generateToken({ id: user.id, role: user.role });
    return responseHandler(res, 201, "User logged in successfully", {
      user,
      token,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return responseHandler(res, 200, "Users fetched succesfully", users);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responseHandler(res, 400, "Invalid user ID");
    }
    const user = await getUserByIdService({ id });
    if (!user) {
      return responseHandler(res, 404, "User not found");
    }
    return responseHandler(res, 200, "User fetched succesfully", user);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responseHandler(res, 400, "Invalid user ID");
    }
    const deletedUser = await deleteUserService({ id });
    if (!deletedUser) {
      return responseHandler(res, 404, "User not found");
    }
    return responseHandler(res, 200, "User deleted succesfully", deletedUser);
  } catch (error) {
    return errorHandler(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const idToUpdate = parseInt(req.params.id);
    if (isNaN(idToUpdate)) {
      return responseHandler(res, 400, "Invalid user ID");
    }

    const requester = req.user;
    if (
      !requester ||
      (requester.role !== "admin" && requester.id !== idToUpdate)
    ) {
      return responseHandler(res, 403, "Forbidden: Access denied");
    }

    const dto = req.body;

    const updatedUser = await updateUserService(idToUpdate, dto);

    if (!updatedUser) {
      return responseHandler(res, 404, "User not found");
    }

    return responseHandler(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    return errorHandler(error, res);
  }
};
