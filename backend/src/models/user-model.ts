import pool from "../config/db";
import bcrypt from "bcrypt";
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserByEmailDto,
  GetUserByIdDto,
  IUser,
  UpdateUserDto,
} from "../types/user.types";
import { Id } from "../types/common.types";

export const createUserService = async ({
  full_name,
  phone_number,
  email,
  password,
}: CreateUserDto): Promise<IUser> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      "INSERT INTO users (full_name, phone_number, email, password_hash, role) VALUES ($1, $2, $3, $4, 'customer') RETURNING *",
      [full_name, phone_number, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error creating user with email ${email}`, error);
    throw error;
  }
};

export const deleteUserService = async ({
  id,
}: DeleteUserDto): Promise<IUser | null> => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error deleting user with id ${id}`, error);
    throw error;
  }
};

export const updateUserService = async (
  id: Id,
  dto: UpdateUserDto
): Promise<IUser | null> => {
  try {
    if (Object.keys(dto).length === 0) {
      return getUserByIdService({ id });
    }

    const fieldsToUpdate = { ...dto };

    if (fieldsToUpdate.password) {
      const saltRounds = 10;
      fieldsToUpdate.password = await bcrypt.hash(
        fieldsToUpdate.password,
        saltRounds
      );
    }
    const setClauses = Object.keys(fieldsToUpdate)
      .map((key, index) => {
        const dbKey =
          {
            fullName: "full_name",
            phoneNumber: "phone_number",
            password: "password_hash",
          }[key] || key;
        return `${dbKey} = $${index + 1}`;
      })
      .join(", ");

    const queryValues = Object.values(fieldsToUpdate);

    const queryString = `
  UPDATE users SET ${setClauses} WHERE id = $${
      queryValues.length + 1
    } RETURNING *`;
    const result = await pool.query(queryString, [...queryValues, id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error(`Error updating user with id ${id}`, error);
    throw error;
  }
};

export const getUserByIdService = async ({
  id,
}: GetUserByIdDto): Promise<IUser | null> => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching user with id ${id}`, error);
    throw error;
  }
};

export const getUserByEmailService = async ({
  email,
}: GetUserByEmailDto): Promise<IUser | null> => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching user with email ${email}`, error);
    throw error;
  }
};

export const getAllUsersService = async (): Promise<IUser[]> => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error fetching all users", error);
    throw error;
  }
};
