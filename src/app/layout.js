import { Nunito } from "next/font/google";
import { StoriesProvider } from "@/context/StoriesContext";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "StoryMind",
  description: "Stories & Summaries, powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${nunito.className} antialiased h-full min-h-full flex flex-col`}>
        <StoriesProvider>{children}</StoriesProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
