"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  // this will dump the cache for the edit page
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  // this will dump the cache for the home page
  revalidatePath("/");
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // get and validate input fields
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  // const code = formData.get("code") as string;

  if (typeof title !== "string" || title.length < 3) {
    return { message: "Title must be longer!" };
  }
  if (typeof code !== "string" || code.length < 10) {
    return { message: "Code must be longer!" };
  }
  // save the data
  try {
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Invalid server error" };
    }
  }
  // this will dump the cache for the home page
  revalidatePath("/");
  // redirect user back to home
  redirect("/");
}
