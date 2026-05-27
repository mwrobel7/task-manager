// @ts-ignore: allow importing global CSS without module declarations
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
