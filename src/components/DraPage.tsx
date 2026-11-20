import { pages } from "../content/dra-pages";
export function DraPage({ name }: { name: string }) {
  return (
    <div
      onSubmit={(event) => {
        event.preventDefault();
        const notice = event.currentTarget.querySelector<HTMLElement>("#preview-notice");
        if (notice) {
          notice.style.display = "block";
          notice.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }}
      dangerouslySetInnerHTML={{ __html: pages[name]!.html }}
    />
  );
}
export function pageHead(name: string) {
  return {
    meta: [{ title: pages[name]!.title }, { name: "robots", content: "noindex, nofollow" }],
    links: [{ rel: "stylesheet", href: pages[name]!.css }],
  };
}
