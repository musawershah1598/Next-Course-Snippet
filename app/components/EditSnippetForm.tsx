"use client";
import { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { editSnippet } from "../actions";

interface EditSnippetFormProps {
  snippet: Snippet;
}

export default function EditSnippetForm({ snippet }: EditSnippetFormProps) {
  const [code, setCode] = useState(snippet.code);

  // const handleCodeChange = (val: string = "") => {
  //   console.log(val);
  // };

  const editSnippetAction = editSnippet.bind(null, snippet.id, code);

  return (
    <div className="flex flex-col gap-4">
      <Editor
        height={"40vh"}
        theme="vs-dark"
        defaultValue={snippet.code}
        language="javascript"
        options={{ minimap: { enabled: false } }}
        // onChange={handleCodeChange}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
