import { disconnect } from "mongoose";

export const disconnectFromDb = async () => {
  return await disconnect();
};
