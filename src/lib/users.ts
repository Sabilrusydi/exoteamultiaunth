export type User = {
    username: string;
    password: string;
    role: "admin" | "kasir" | "barista" | "manajer";
  };
  
  export const users: User[] = [
    { username: "admin", password: "admin", role: "admin" },
    { username: "kasir1", password: "kasir123", role: "kasir" },
    { username: "barista1", password: "barista123", role: "barista" },
    { username: "manajer", password: "manajer123", role: "manajer" },
  ];
  