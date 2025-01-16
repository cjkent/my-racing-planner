import { usePageTracking } from "@/hooks/usePageTracking";
import { Flex, Spinner, Stack, StackProps } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";
const AboutPage = lazy(() => import("../about"));
const CarsPage = lazy(() => import("../content/cars-page"));
const SeasonPage = lazy(() => import("../season/season-page"));
const SeriesPage = lazy(() => import("../series/series-page"));
const ShopPage = lazy(() => import("../shop-guide/shop-page"));
const TracksPage = lazy(() => import("../content/tracks-page"));

function MainContainer({ ...props }: StackProps) {
  usePageTracking();

  return (
    <Stack {...props}>
      <Flex
        height="100%"
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
            <Route path="/" component={SeasonPage} />
            <Route path="/series" component={SeriesPage} />
            <Route path="/cars" component={CarsPage} />
            <Route path="/tracks" component={TracksPage} />
            <Route path="/checkout" component={ShopPage} />
            <Route path="/about" component={AboutPage} />

            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </Flex>
    </Stack>
  );
}

export default MainContainer;
