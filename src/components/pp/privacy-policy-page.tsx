import { lazy, Suspense } from "react";
import LoadingContainer from "../page/loading-container";
import Page from "../page/page";
import PageHeader from "../page/page-header";
const PrivacyPolicyContent = lazy(() => import("./privacy-policy-content"));

function PrivacyPolicyPage() {
  return (
    <Page>
      <PageHeader
        title="Privacy Policy"
        description={"Last updated: Wed 15 Jan, 2025"}
      />
      <Suspense fallback={<LoadingContainer />}>
        <PrivacyPolicyContent />
      </Suspense>
    </Page>
  );
}

export default PrivacyPolicyPage;
