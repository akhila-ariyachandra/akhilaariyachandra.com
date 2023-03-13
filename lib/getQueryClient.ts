// https://tanstack.com/query/v4/docs/react/guides/ssr#using-experimental-app-directory-in-nextjs-13
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;
