import "./globals.css";
import ThinkingTopography from "@/components/ThinkingTopography";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-neutral-900">
        <ThinkingTopography />
        <div className="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
