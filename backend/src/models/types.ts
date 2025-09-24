export type createUserServiceProps = {
  name: string;
  number: string;
  email: string;
  password: string;
};

export type deleteUserServiceProps = {
  id: number;
};

export type updateUserServiceProps = {
  id: number;
  name?: string;
  number?: string;
  email?: string;
  password?: string;
  role?: string;
};

export type getUserByIdServiceProps = {
  id: number;
};

export type getUserByEmailServiceProps = {
  email: string;
};
