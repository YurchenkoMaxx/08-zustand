import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const PER_PAGE = 12;

type PageProps = {
  params: { slug: string[] };
};

export default async function NotesByTagPage({ params }: PageProps) {
  const resolvedParams=await params;
  const tagFromUrl = resolvedParams.slug?.[0] ?? "all";

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