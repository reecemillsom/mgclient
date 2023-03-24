import { connection } from "mongoose";

export const dropDatabase = async (): Promise<boolean> => {
  return await connection.db.dropDatabase();
};
