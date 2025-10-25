"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faImage,
  faItalic,
  faListOl,
  faListUl,
  faRotateLeft,
  faRotateRight,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

const TiptapEditor = ({ value = "متنی وارد کنید...", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      Link,
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value || "<p>متن خود را وارد کنید...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("آدرس تصویر را وارد کنید:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-pal1-400 rounded-lg p-3 space-y-2">
      <div className="flex flex-wrap gap-2 border-b border-pal1-600 pb-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${
            editor.isActive("bold") ? "font-bold bg-gray-200 px-2" : "px-2"
          } hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          <FontAwesomeIcon className="text-xl text-pal4-700" icon={faBold} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "italic bg-gray-200 px-2" : "px-2"
          } hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          <FontAwesomeIcon className="text-xl text-pal4-700" icon={faItalic} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${
            editor.isActive("underline") ? "underline bg-gray-200 px-2" : "px-2"
          } hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          <FontAwesomeIcon
            className="text-xl text-pal4-700"
            icon={faUnderline}
          />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200 px-2"
              : "px-2"
          }
            text-xl text-pal4-700 hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200 px-2"
              : "px-2"
          } text-xl text-pal4-700 hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-200 px-2"
              : "px-2"
          } text-xl text-pal4-700 hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList") ? "bg-gray-200 px-2" : "px-2"
          } hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          <FontAwesomeIcon className="text-xl text-pal4-700" icon={faListUl} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${
            editor.isActive("orderedList") ? "bg-gray-200 px-2" : "px-2"
          } hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer`}
        >
          <FontAwesomeIcon className="text-xl text-pal4-700" icon={faListOl} />
        </button>
        <button
          onClick={addImage}
          className="px-2 hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer"
        >
          <FontAwesomeIcon className="text-xl text-pal4-700" icon={faImage} />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-xl text-pal4-700"
            icon={faRotateLeft}
          />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 hover:border-b-2 border-pal4-800 rounded transition-all duration-75 cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-xl text-pal4-700"
            icon={faRotateRight}
          />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="tiptap-editor border border-pal1-400 rounded-md px-1.5 py-2 min-h-[200px] prose max-w-none focus:outline-none"
      />
    </div>
  );
};
export default TiptapEditor;
