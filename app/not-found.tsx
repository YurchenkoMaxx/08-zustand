import css from "./HomePage.module.css";
import { Metadata } from "next";

const APP_NAME = "NoteHub";
const SITE_URL = "https://notehub.example"; // <-- той самий URL
const PAGE_URL = `${SITE_URL}/not-found`;

export const metadata: Metadata = {
  title: `404 — Page Not Found | ${APP_NAME}`,
  description: "The page you are looking for does not exist in NoteHub.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: `404 — Page Not Found | ${APP_NAME}`,
    description: "The page you are looking for does not exist in NoteHub.",
    url: PAGE_URL,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph image",
      },
    ],
    type: "website",
  },
};


export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
