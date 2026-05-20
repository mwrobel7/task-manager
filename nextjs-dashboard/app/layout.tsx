// @ts-ignore: Allow importing global CSS file without type declarations
import "./style.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-gray-300 text-black">{children}</body>
    </html>
  );
}
