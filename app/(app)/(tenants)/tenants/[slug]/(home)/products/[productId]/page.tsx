import { ProductView } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
  params: Promise<{ productId: string; slug: string }>;
}
const ProductPage = async ({ params }: Props) => {
  const { productId, slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getOne.queryOptions({
      id: productId,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Suspense fallback={<NavbarSkeleton />}> */}
      <ProductView productId={productId} tenantSlug={slug} />
      {/* </Suspense> */}
    </HydrationBoundary>
  );
};

export default ProductPage;
