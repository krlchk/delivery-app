import { IBase, Id, Role } from "./common.types";

export interface IUser extends IBase {
  fullName: string;
  phoneNumber: string;
  email: string;
  passwordHash: string;
  role: Role;
}


export type CreateUserDto ={
  fullName:string,
      phoneNumber:string,
      email:string,
      password:string,
}


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
