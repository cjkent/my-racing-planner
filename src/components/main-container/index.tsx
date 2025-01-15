import { Flex, Stack, StackProps } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
const AboutPage = lazy(() => import("../about"));
const CarsPage = lazy(() => import("../content/cars-page"));
const TracksPage = lazy(() => import("../content/tracks-page"));
const SeasonPage = lazy(() => import("../season/season-page"));
const SeriesPage = lazy(() => import("../series/series-page"));
const ShopPage = lazy(() => import("../shop-guide/shop-page"));

function MainContainer({ ...props }: StackProps) {
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
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={SeasonPage} />
            <Route path="/series" component={SeriesPage} />
            <Route path="/cars" component={CarsPage} />
            <Route path="/tracks" component={TracksPage} />
            <Route path="/checkout" component={ShopPage} />
            <Route path="/about" component={AboutPage} />

            {/* Default route in a switch */}
            <Route>404: No such page!</Route>
          </Switch>
        </Suspense>
      </Flex>
    </Stack>
  );
}

export default MainContainer;
