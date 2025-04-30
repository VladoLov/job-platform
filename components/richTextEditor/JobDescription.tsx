import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { ControllerRenderProps } from "react-hook-form";

interface iAppProps {
  filed: ControllerRenderProps;
}

export default function JobDescriptionEditor({ filed }: iAppProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert p-4 focus:outline-none min-h-[300px] max-h-none overflow-y-auto",
      },
    },
    onUpdate: ({ editor }) => {
      filed.onChange(JSON.stringify(editor.getJSON()));
    },
    content: filed.value ? JSON.parse(filed.value) : "",
  });
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
