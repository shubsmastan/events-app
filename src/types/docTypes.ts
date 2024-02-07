export interface Event {
  _id: string;
  name: string;
  desc: string;
  price: number;
  date: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  pwd: string;
}
