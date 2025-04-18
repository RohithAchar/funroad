import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "category",
      type: "text",
      required: true,
    },
  ],
};
