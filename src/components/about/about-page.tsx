import { lazy, Suspense } from "react";
import LoadingContainer from "../page/loading-container";
import Page from "../page/page";
import PageHeader from "../page/page-header";
const AboutContent = lazy(() => import("./about-content"));

function AboutPage() {
  return (
    <Page>
      <PageHeader
        title="About"
        description={`About My Racing Planner (v${APP_VERSION})`}
      />
      <Suspense fallback={<LoadingContainer />}>
        <AboutContent />
      </Suspense>
    </Page>
  );
}

export default AboutPage;
