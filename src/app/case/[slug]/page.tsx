import { notFound } from "next/navigation";
import { getCaseStudy } from "@/case-studies";
import { CaseLayout } from "@/components/case/CaseLayout";
import { CaseOverview } from "@/components/case/CaseOverview";
import { CaseMap } from "@/components/case/CaseMap";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // This would be dynamic in a real app
  return [
    { slug: "omantel-bulk-activation" },
    { slug: "another-case" },
    { slug: "real-estate-connectivity" },
  ];
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <CaseLayout title={caseStudy.title} caseStudy={caseStudy}>
      <CaseOverview caseStudy={caseStudy} />
      <CaseMap caseStudy={caseStudy} />
    </CaseLayout>
  );
}
