export interface UserData {
  username: string;
  password?: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  plainPassword?: string;
  timezoneId?: string;
  avatar?:string
}

export interface UserRegister{
  username: string;
  plainPassword: string;
  email?: string;

}


