import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { Media, Tenant } from "@/payload-types";

export const tenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        subdomain: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const tenantData = await ctx.payload.find({
        collection: "tenants",
        where: {
          subdomain: {
            equals: input.subdomain,
          },
        },
        depth: 1,
        pagination: false,
        limit: 1,
      });

      const data = {
        ...tenantData.docs[0],
      };

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      return data as Tenant & { image: Media | null };
    }),
});
