import { HomePageClient } from "./HomePageClient";

export default function Home() {
  return (
    <main className="home-page-main layout-main">
      <div className="home-bg-grid" aria-hidden />
      <div className="content-wrap">
        <HomePageClient />
      </div>
    </main>
  );
}
