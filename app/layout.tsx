import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ぴよぴよ Python",
  description: "ブラウザで書いて動かす Python 入門",
  // インストール用の設定。置き場所(basePath)を前に付ける
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/manifest.webmanifest`,
};

// GitHub Pages ではヘッダを設定できないので、CSP は meta で付ける(本番のみ。開発サーバーは eval を使うため)。
// wasm-unsafe-eval は Pyodide(ブラウザの Python)に必要。外部への通信は許可しない。
const CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data:; connect-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        {process.env.NODE_ENV === "production" && <meta httpEquiv="Content-Security-Policy" content={CSP} />}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
