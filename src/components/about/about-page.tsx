import Page from "../page/page";
import PageHeader from "../page/page-header";
import About from "./about";

function AboutPage() {
  return (
    <Page>
      <PageHeader
        title="About"
        description={`About My Racing Planner (v${APP_VERSION}) and Privacy Policy`}
      />
      <About />
    </Page>
  );
}

export default AboutPage;
