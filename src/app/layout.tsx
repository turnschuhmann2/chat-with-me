import { ThemeProvider } from "~/providers/theme-provider";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";
import "@/styles/scroll.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Chat with me!",
  description: "",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨🏼‍💻</text></svg>",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="gradient-background flex h-dvh min-h-dvh flex-row items-center justify-center">
              <div className="container flex h-full flex-row items-center justify-between gap-8 px-2 py-2 md:px-8 md:py-12 ">
                {children}
              </div>
            </main>
            {modal}
            <div id="modal-root" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
