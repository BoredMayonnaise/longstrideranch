import Link from "next/link";

export function Crumbs({ current }: { current: string }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span>{current}</span>
    </nav>
  );
}
