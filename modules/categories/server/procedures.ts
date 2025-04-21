import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "category",
    });

    const formatedData = data.docs.map((doc) => {
      return {
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          ...(doc as Category),
          subcategories: undefined,
        })),
      };
    });

    return formatedData;
  }),
});
