import { getPayload } from "payload";
import config from "@payload-config";

export default async function Home() {
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "categories",
  });

  return <div className="p-12">{JSON.stringify(data, null, 2)}</div>;
}
