"use client";

import css from "./NotesClient.module.css";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useDebounce } from "use-debounce";
import type { NoteTag } from "@/types/note";

const PER_PAGE = 12;

type NotesClientProps = {
  initialTag?: "" | NoteTag;
};

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [tag] = useState<"" | NoteTag>(initialTag ?? "");

  const { data, isLoading, isError, error } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch, tag }),
    placeholderData: (prev) => prev,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}

        {/* ✅ тепер це link, а не modal */}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {isLoading && <Loader />}

      {isError && (
        <ErrorMessage message={error?.message || "Something went wrong"} />
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}