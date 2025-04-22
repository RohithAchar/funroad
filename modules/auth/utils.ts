import { cookies as getCookie } from "next/headers";

interface Props {
  prefix: string;
  value: string;
}

export const generateCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookie();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
};
