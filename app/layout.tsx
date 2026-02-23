import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "../styles/globals.css";
import { Metadata } from "next";
import {Roboto} from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub - note taking app built with Next.js",
  openGraph: {
  type: 'website',
  url: "https://example.com",
  title: "NoteHub",
  description: "NoteHub - note taking app built with Next.js",
  siteName: "NoteHub",
  images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg", alt: "NoteHub Open Graph Image", width: 1200, height: 630 }],
},
twitter: {
  card: 'summary_large_image',
  title: "NoteHub",},
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
      <body className={`${roboto.variable}`}  >
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          {modal}
          <div id="modal-root"></div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
