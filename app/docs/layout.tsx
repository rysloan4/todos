export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="p-10 docs border border-solid m-10">{children}</div>;
}
