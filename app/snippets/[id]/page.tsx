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
          <button className="bg-red-400 hover:bg-red-500 p-2 border rounded">
            Delete
          </button>
        </div>
      </div>
      <pre className="p-4 bg-gray-200 rounded border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
