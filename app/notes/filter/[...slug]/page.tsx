import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const PER_PAGE = 12;

const SITE_URL = "https://08-zustand-omega-woad.vercel.app/";

type PageProps = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tagFromUrl = params.slug?.[0] ?? "all";

  const title = `Notes tagged with "${tagFromUrl}" | NoteHub`;
  const description = `Browse notes tagged with "${tagFromUrl}" in NoteHub.`;
  const url = `${SITE_URL}/notes/filter/${params.slug?.join("/") ?? ""}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function NotesByTagPage({ params }: PageProps) {
  const tagFromUrl = params.slug?.[0] ?? "all";

  const tag: "" | NoteTag =
    tagFromUrl === "all"
      ? ""
      : TAGS.includes(tagFromUrl as NoteTag)
      ? (tagFromUrl as NoteTag)
      : "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}