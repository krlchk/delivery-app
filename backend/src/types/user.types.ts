import { IBase, Id, Role } from "./common.types";

export interface IUser extends IBase {
  full_name: string;
  phone_number: string;
  email: string;
  password_hash: string;
  role: Role;
}

export type CreateUserDto = Omit<
  IUser,
  "id" | "created_at" | "updated_at" | "role" | "password_hash"
> & { password: string };

export type DeleteUserDto = {
  id: Id;
};

export type GetUserByIdDto = {
  id: Id;
};

export type UpdateUserDto = Partial<CreateUserDto> & { role?: Role; id: Id };

export type GetUserByEmailDto = {
  email: string;
};
