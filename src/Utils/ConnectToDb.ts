import { connect } from "mongoose";

export interface ConnectionOptions {
  user?: string;
  pass?: string;
  autoIndex?: boolean;
  dbName?: string;
  useNewUrlParser?: boolean;
}

export const connectToDb = async (
  connectionString: string,
  options?: ConnectionOptions
) => {
  await connect(connectionString, {
    useNewUrlParser: true,
    ...options,
  });
};
