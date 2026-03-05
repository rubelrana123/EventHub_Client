import { PublicFooter } from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

export const dynamic = "force-dynamic";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
