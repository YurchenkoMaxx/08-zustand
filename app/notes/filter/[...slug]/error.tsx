"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function NotesBySlugError({ error, reset }: Props) {
  return (
    <div>
      <p>Could not fetch notes. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}