import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function headingId(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}

export default function MarkdownArticle({ body }: { body: string }) {
  // SitePage provides the sole visible H1; the standalone Markdown retains its own H1.
  const content = body.replace(/^# .+\n+/, "");
  return (
    <div className="blog-markdown">
      <Markdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(String(children))}>{children}</h3>,
          a: ({ href, children }) => href?.startsWith("/")
            ? <Link href={href}>{children}</Link>
            : <a href={href}>{children}</a>,
          table: ({ children }) => (
            <div className="blog-table-scroll" role="region" aria-label="Comparison table" tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
        }}
      >{content}</Markdown>
    </div>
  );
}
