import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "../styles/globals.css";

export const metadata = {
  title: "NoteHub",
  description: "NoteHub – note taking app built with Next.js",
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
      <body>
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
