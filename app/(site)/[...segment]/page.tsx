import { notFound } from "next/navigation";

// This page only calls `notFound()`, so there's no UI to validate.
export const instant = false;

const CatchAllPage = () => {
  notFound();
};

export default CatchAllPage;
