import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = "https://your-domain.com"; // <- заміни на свій Vercel/Render URL

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = params.id;

  const note = await fetchNoteById(id);

  // якщо API може повернути null/undefined — безпечний fallback
  if (!note) {
    const title = `Note not found | NoteHub`;
    const description = `This note does not exist.`;

    const url = `${SITE_URL}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
        ],
      },
    };
  }

  const title = `${note.title} | NoteHub`;
  const description = note.content ? note.content.slice(0, 150) : "Note details in NoteHub.";
  const url = `${SITE_URL}/notes/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const id = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
