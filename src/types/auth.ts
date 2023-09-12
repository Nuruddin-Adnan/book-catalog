import { User } from "./user";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
};
