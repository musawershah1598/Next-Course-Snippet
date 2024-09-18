import { deleteSnippet } from "@/app/actions";
import { db } from "@/app/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ShowSnippetPageProps {
  params: {
    id: string;
  };
}

export default async function ShowSnippetPage(props: ShowSnippetPageProps) {
  await new Promise((r) => setTimeout(r, 2000));
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  const snippetDeleteAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h1 className="font-bold text-2xl">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="hover:bg-gray100 p-2 border rounded"
          >
            Edit
          </Link>
          <form action={snippetDeleteAction}>
            <button className="bg-red-400 hover:bg-red-500 p-2 border rounded">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-4 bg-gray-200 rounded border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// below code will generate static pages for all the snippets
// if there is new page added, it will not be added to the static pages
// to fix this we can use revalidate option in editSnippet action.
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => ({ id: snippet.id.toString() }));
}
