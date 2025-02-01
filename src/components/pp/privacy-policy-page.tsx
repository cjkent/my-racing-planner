import Page from "../page/page";
import PageHeader from "../page/page-header";
import PrivacyPolicy from "./privacy-policy";

function PrivacyPolicyPage() {
  return (
    <Page>
      <PageHeader
        title="Privacy Policy"
        description={"Last updated: Wed 15 Jan, 2025"}
      />
      <PrivacyPolicy />
    </Page>
  );
}

export default PrivacyPolicyPage;
