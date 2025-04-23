interface Props {
  params: {
    subcategory: string;
  };
}

const SubCategory = async ({ params }: Props) => {
  const { subcategory } = await params;
  return <div>{subcategory}</div>;
};

export default SubCategory;
