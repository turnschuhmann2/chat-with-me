import { ThemeProvider } from "~/providers/theme-provider";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/scroll.css";
import "@/styles/icons.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {modal}
          <div id="modal-root" />
        </ThemeProvider>
      </body>
    </html>
  );
}
