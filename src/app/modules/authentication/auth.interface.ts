// User registration interface
export interface IUserRegister {
  _id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  phone: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
