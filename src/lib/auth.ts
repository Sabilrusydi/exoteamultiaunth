import { users, User } from "./users";

export function authenticate(username: string, password: string): User | null {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user ?? null;
}
