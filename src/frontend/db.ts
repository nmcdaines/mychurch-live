// import { drizzle } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "../backend/schema";

export const database = drizzle(
  async (...args) => {
    try {
      // @ts-expect-error referencing the ipc connection
      const result = await window.api.execute(...args);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log("Error from slqite proxy server: ", e.response.data);
      return { rows: [] };
    }
  },
  {
    schema,
  },
);

export { schema };
