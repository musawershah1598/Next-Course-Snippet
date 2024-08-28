"use client";
import {Snippet} from "@prisma/client";
import Editor from "@monaco-editor/react";
import {useState} from "react";
import {editSnippet} from "../actions";
import {useRouter} from 'next/navigation'

interface EditSnippetFormProps {
    snippet: Snippet;
}

export default function EditSnippetForm({snippet}: EditSnippetFormProps) {
    const [code, setCode] = useState(snippet.code);

    const router = useRouter();
    // const handleCodeChange = (val: string = "") => {
    //   console.log(val);
    // };

    const editSnippetAction = editSnippet.bind(null, snippet.id, code);

    return (
        <div className="flex flex-col gap-4">
            <button onClick={() => router.back()}
                    className={"mr-2 border bg-gray-50 px-4 py-2 rounded hover:bg-gray-100"}>Go back
            </button>
            <Editor
                height={"40vh"}
                theme="vs-dark"
                defaultValue={snippet.code}
                language="javascript"
                options={{minimap: {enabled: false}}}
                // onChange={handleCodeChange}
            />


            <form action={editSnippetAction}>
                <button type="submit"
                        className="px-4 py-2 border rounded bg-blue-400 hover:bg-blue-500 text-white font-bold">
                    Save
                </button>
            </form>
        </div>
    );
}
