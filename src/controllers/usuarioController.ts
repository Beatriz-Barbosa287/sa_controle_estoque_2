import User from "../models/usuarios";

export async function getUsers() {
  return await User.find();
}

export async function getUserByUsername(username: string) {
  return await User.findOne({ username });
}

export async function createUser(data:any) {
  const user = new User(data);
  return await user.save();
}
