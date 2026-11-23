import type { NextConfig } from "next";

// GitHub Pages では https://<ユーザー>.github.io/<リポジトリ名>/ に置くので、その前置きを付ける(手元では空)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // サーバー不要の静的ファイルとして書き出す
  basePath,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
