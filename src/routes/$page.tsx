import { createFileRoute, notFound } from "@tanstack/react-router";
import { DraPage, pageHead } from "../components/DraPage";
import { pages } from "../content/dra-pages";
export const Route = createFileRoute("/$page")({
  loader: ({ params }) => {
    const name = params.page.replace(/\.html$/, "");
    if (!pages[name]) throw notFound();
    return { name };
  },
  head: ({ loaderData }) => (loaderData ? pageHead(loaderData.name) : {}),
  component: Page,
});
function Page() {
  const { name } = Route.useLoaderData();
  return <DraPage key={name} name={name} />;
}
