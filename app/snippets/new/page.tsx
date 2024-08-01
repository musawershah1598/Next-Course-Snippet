import { db } from "@/app/db";
import { redirect } from "next/navigation";

export default function CreateSnippet() {
  async function createSnippet(formData: FormData) {
    // mark the function as server action
    "use server";

    // get and validate input fields
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    // save the data
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log(snippet);

    // redirect user back to home
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h1 className="font-bold text-2xl m-4">Create Snippet</h1>

      <div className="flex flex-col gap-4 m-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="border p-2" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="code">Code</label>
          <textarea name="code" id="code" className="border p-2"></textarea>
        </div>

        <button className="bg-blue-400 hover:bg-blue-500 p-2 text-white rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
