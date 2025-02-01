import { usePageTracking } from "@/hooks/usePageTracking";
import { ETabs } from "@/store/ui";
import { Flex, Spinner } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";

const AboutPage = lazy(() => import("../about/about-page"));
const CarsPage = lazy(() => import("../content/cars-page"));
const PrivacyPolicyPage = lazy(() => import("../pp/privacy-policy-page"));
const SeasonPage = lazy(() => import("../season/season-page"));
const SeriesPage = lazy(() => import("../series/series-page"));
const ShopPage = lazy(() => import("../shop-guide/shop-page"));
const TracksPage = lazy(() => import("../content/tracks-page"));

function MainContainer() {
  usePageTracking();
  return (
    <Flex
      overflow={"hidden"}
      flex={1}
      width={"100%"}
      padding="8px"
      bg={"irbgc.light"}
      borderColor={"irborder.light"}
      _dark={{ bg: "irbgc.dark", borderColor: "irborder.dark" }}
      md={{
        borderRadius: "xl",
        borderWidth: "1px",
        boxShadow: "rgba(5, 5, 15, 0.16) 0px 12px 24px -2px",
      }}
    >
      <Suspense
        fallback={
          <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
            <Spinner size={"xl"} borderWidth="4px" />
          </Flex>
        }
      >
        <Switch>
          <Route path={ETabs.MySeason} component={SeasonPage} />
          <Route path={ETabs.MySeries} component={SeriesPage} />
          <Route path={ETabs.MyCars} component={CarsPage} />
          <Route path={ETabs.MyTracks} component={TracksPage} />
          <Route path={ETabs.ShopGuide} component={ShopPage} />
          <Route path={ETabs.About} component={AboutPage} />
          <Route path={ETabs.PrivacyPolicy} component={PrivacyPolicyPage} />

          <Route>
            <Redirect to={ETabs.MySeason} />
          </Route>
        </Switch>
      </Suspense>
    </Flex>
  );
}

export default MainContainer;
