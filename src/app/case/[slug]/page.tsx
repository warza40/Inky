import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/case-studies";
import { CaseLayout } from "@/components/case/CaseLayout";
import { CaseMap } from "@/components/case/CaseMap";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
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
