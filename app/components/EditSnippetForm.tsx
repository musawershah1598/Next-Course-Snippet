"use client";
import { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";

interface EditSnippetFormProps {
  snippet: Snippet;
}

export default function EditSnippetForm({ snippet }: EditSnippetFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleCodeChange = (val: string = "") => {
    console.log(val);
  };

  return (
    <div>
      <Editor
        height={"40vh"}
        theme="vs-dark"
        defaultValue={snippet.code}
        language="javascript"
        options={{ minimap: { enabled: false } }}
        onChange={handleCodeChange}
      />
    </div>
  );
}
