import { PageShell } from "@/components/sheets/PageShell";
import { MinimalHomepage } from "@/components/home/MinimalHomepage";

export default function Home() {
  return (
    <PageShell as="main" className="layout-main">
      <MinimalHomepage />
    </PageShell>
  );
}
