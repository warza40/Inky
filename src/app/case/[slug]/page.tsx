import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/case-studies";
import { CaseLayout } from "@/components/case/CaseLayout";
import { CaseMap } from "@/components/case/CaseMap";
import { siteName } from "@/lib/site-metadata";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "omantel-bulk-activation" },
    { slug: "another-case" },
    { slug: "warehouse-operations" },
    { slug: "disaster-recovery" },
  ];
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return { title: "Case study not found" };
  }

  const title = caseStudy.title;
  const description =
    caseStudy.heroProblemStatement?.trim() ||
    caseStudy.overview?.problem?.trim() ||
    caseStudy.overview?.context?.slice(0, 160) ||
    `Case study by ${siteName}.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Page({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <CaseLayout title={caseStudy.title} caseStudy={caseStudy}>
      <CaseMap caseStudy={caseStudy} />
    </CaseLayout>
  );
}
