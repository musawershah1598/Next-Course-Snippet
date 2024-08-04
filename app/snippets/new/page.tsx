"use client";

import { createSnippet } from "@/app/actions";
import { useState } from "react";
import { useFormState } from "react-dom";
import Editor from "@monaco-editor/react";

export default function CreateSnippet() {
  const [code, setCode] = useState("");
  const [formState, action] = useFormState(createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h1 className="font-bold text-2xl m-4">Create Snippet</h1>

      {formState.message && (
        <div className="my-2 p-2 bg-red-600 rounded text-white">
          {formState.message}
        </div>
      )}

      <div className="flex flex-col gap-4 m-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className="border p-2" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="code">Code</label>
          {/* <textarea name="code" id="code" className="border p-2"></textarea> */}
          <Editor
            language="javascript"
            height={"40vh"}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val ? val : "")}
          />
          <input type="hidden" name="code" value={code} />
        </div>

        <button className="bg-blue-400 hover:bg-blue-500 p-2 text-white rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
