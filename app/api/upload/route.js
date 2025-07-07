import formidable from "formidable";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const POST = async (req) => {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      return `${Date.now()}-${name}${ext}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err)
        return reject(
          NextResponse.json(
            { error: "در زمان اپلود  خطایی رخ داد!" },
            { status: 500 }
          )
        );
      const imageFile = files.image?.[0];
      if (!imageFile)
        return reject(
          NextResponse.json({ error: "عکسی انتخاب نشده است!" }, { status: 400 })
        );
      const fileName = path.basename(imageFile.filepath);
      const imageUrl = `/uploads/${fileName}`;
      return resolve(NextResponse.json({ image: imageUrl }, { status: 200 }));
    });
  });
};
