import { PageShell } from "@/components/sheets/PageShell";
import { MinimalHomepage } from "@/components/home/MinimalHomepage";

export default function Home() {
  return (
    <PageShell className="layout-main" sparkleMarks="home">
      <MinimalHomepage />
    </PageShell>
  );
}
