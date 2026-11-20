import { createFileRoute } from "@tanstack/react-router";
import { DraPage, pageHead } from "../components/DraPage";
export const Route = createFileRoute("/")({
  head: () => pageHead("index"),
  component: () => <DraPage name="index" />,
});
