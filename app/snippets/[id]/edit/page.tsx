interface EditSnippetPageProps {
  params: {
    id: string;
  };
}

export default function EditSnippetPage(props: EditSnippetPageProps) {
  const id = parseInt(props.params.id);
  return <div>Edit Page with Snippet: {id}</div>;
}
