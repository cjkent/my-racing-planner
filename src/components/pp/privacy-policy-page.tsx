import Page from "../page/page";
import PageHeader from "../page/page-header";
import PrivacyPolicy from "./privacy-policy";

function PrivacyPolicyPage() {
  return (
    <Page>
      <PageHeader
        title="Privacy Policy"
        description={"How user's personal data is handled on this site"}
      />
      <PrivacyPolicy />
    </Page>
  );
}

export default PrivacyPolicyPage;
