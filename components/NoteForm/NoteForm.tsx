"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import css from "./NoteForm.module.css";
import type { CreateNoteParams, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // ✅ беремо draft зі store (селектори — щоб не було зайвих ререндерів)
  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  // ✅ локальний state форми (контрольовані поля)
  const [title, setTitle] = useState(initialDraft.title);
  const [content, setContent] = useState(initialDraft.content);
  const [tag, setTag] = useState<NoteTag>(initialDraft.tag);

  // ✅ при вході на /create — підставляємо draft
  useEffect(() => {
    setTitle(draft?.title ?? initialDraft.title);
    setContent(draft?.content ?? initialDraft.content);
    setTag((draft?.tag as NoteTag) ?? initialDraft.tag);
    // важливо: тільки при монтуванні/коли draft зміниться через persist hydration
  }, [draft]);

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteParams) => createNote(newNote),
    onSuccess: () => {
      toast.success("Note created");
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      // ✅ очищаємо draft тільки після успішного створення
      clearDraft();

      // ✅ повертаємось назад (як в умові)
      router.back();
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  // ✅ збереження в draft на кожну зміну
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    setDraft({ title: value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setDraft({ content: value });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as NoteTag;
    setTag(value);
    setDraft({ tag: value });
  };

  // ✅ submit через formAction
  const handleCreate = () => {
    if (title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    const payload: CreateNoteParams = {
      title: title.trim(),
      content: content.trim(),
      tag,
    };

    mutation.mutate(payload);
  };

  // ✅ Cancel: draft НЕ чистимо
  const handleCancel = () => router.back();

  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          className={css.input}
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={handleContentChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          value={tag}
          onChange={handleTagChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        {/* ✅ formAction як в умові */}
        <button
          type="submit"
          className={css.submitButton}
          formAction={handleCreate}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}