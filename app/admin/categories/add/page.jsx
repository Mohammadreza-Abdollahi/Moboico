"use client";
import Tiptap from "@/components/tiptap/TiptapComponent";
import { useEffect, useState } from "react";

const AddProductPage = () => {
  const [des, setDes] = useState("");
  useEffect(() => {
    console.log(des);
  }, [des]);
  return (
    <>
      <Tiptap value={des} onChange={setDes} />
    </>
  );
};

export default AddProductPage;
