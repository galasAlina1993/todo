export interface ITodo {
  id: number;
  name: string;
  descr: string;
  time: string;
  status: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
