

export default function FilterLayout({
  children,
  sidebar
}: {
  children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
  return (
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24 }}>
      <aside>{sidebar}</aside>
      <section>{children}</section>
    </div>
  );
}