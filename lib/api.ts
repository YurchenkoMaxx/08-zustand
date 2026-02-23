import axios from "axios";
import type { Note, CreateNoteParams } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

function getAuthHeaders() {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  console.log("TOKEN LEN (server):", token?.length ?? 0);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const cleanedParams: FetchNotesParams = { ...params };

  if (!params.search?.trim()) delete cleanedParams.search;
  if (!params.tag) delete cleanedParams.tag;

  const response = await instance.get<FetchNotesResponse>("/notes", {
    params: cleanedParams,
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await instance.post<Note>("/notes", data, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await instance.delete<Note>(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await instance.get<Note>(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
}
