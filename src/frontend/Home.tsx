import { useEffect, useState } from "react";
import { database, schema } from "./db";

export default function Home() {
  const [results, setResults] = useState<null | any[]>(null);

  useEffect(() => {
    (async () => {
      // await database
      //   .insert(schema.devicesTable)
      //   .values({ name: "BirdDog Camera", ipAddress: "192.168.28" });

      setResults(await database.query.devicesTable.findMany());
    })();
  });

  return (
    <div>
      ...
      {JSON.stringify(results)}
    </div>
  );
}
