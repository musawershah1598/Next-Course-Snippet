import Link from "next/link";
import { db } from "./db";
// on production this will not fetch new records as it is a static site, to change this behaviour we have three options

// 1. Use revalidate option, which dump cache after a certain time
// export const revalidate = 3;
// 2. dumpo cache when a new record is added
// for this check actions file
// 3. disable caching completely

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((item) => (
    <Link
      href={`/snippets/${item.id}`}
      key={item.id}
      className="flex justify-between items-center p-2 border rounded"
    >
      <div>{item.title}</div>
      <div>View</div>
    </Link>
  ));

  return (
    <div>
      <div className="flex justify-between items-center m-2">
        <h1 className="text-2xl font-bold">Snippets</h1>
        <Link
          href="/snippets/new"
          className="border rounded p-2 hover:bg-gray-100"
        >
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
