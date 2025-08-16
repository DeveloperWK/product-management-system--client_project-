interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
interface refreshToken {
  user_id?: number;
  token: string;
  expires_at: Date;
}

export { IUser, refreshToken };
