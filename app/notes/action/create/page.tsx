 import type { Metadata } from "next";
import css from "./CreateNotePage.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in NoteHub.",
  alternates: {
    canonical: `${SITE_URL}/notes/action/create`,
  },
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub.",
    url: `${SITE_URL}/notes/action/create`,
    images: [{ url: OG_IMAGE }],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}