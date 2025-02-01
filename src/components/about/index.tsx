import { For, Heading, Link, List, Stack, Text } from "@chakra-ui/react";
import { useContainer } from "../main-container/useContainer";
import PageHeader from "../page/page-header";
import { Tooltip } from "../ui/tooltip";

const contributors = [
  { name: "Adriano Lima", github: "adrianulima" },
  { name: "Juni Lima", github: "junilima" },
];
function AboutPage() {
  const { onScroll } = useContainer();
  return (
    <Stack height="100%" width="100%" gap="8px">
      <PageHeader
        title="About"
        description={`About My Racing Planner (v${APP_VERSION}) and Privacy Policy`}
      />
      <Stack
        p={{ base: 4, md: 10 }}
        overflowY={"auto"}
        textAlign={"justify"}
        borderRadius={"md"}
        bgColor={"bg.muted"}
        flex={1}
        onScroll={onScroll}
      >
        <section>
          <Heading>Data Updates</Heading>
          <Text as="p">
            The content on this site is updated at the beginning of every
            iRacing season. All data is fetched directly from the iRacing public
            API.
          </Text>
          <Text as="p" mt={2}>
            For detailed update history, visit the{" "}
            <Link
              href="https://github.com/adrianulima/my-racing-planner/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noreferrer"
            >
              change log file
            </Link>
            .
          </Text>
        </section>

        <section>
          <Heading mt={2}>Feedback and Suggestions</Heading>
          <Text as="div">
            Your feedback will be highly appreciated! If you have any
            suggestions or encounter issues, please consider opening an issue at
            the{" "}
            <Link
              href="https://github.com/adrianulima/my-racing-planner"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository
            </Link>{" "}
            or send me an{" "}
            <Tooltip
              lazyMount
              unmountOnExit
              content={"adrianulima@gmail.com"}
              showArrow
              positioning={{ placement: "bottom" }}
              openDelay={200}
              closeDelay={100}
            >
              <Link
                href="mailto:adrianulima@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                email
              </Link>
            </Tooltip>
            .
          </Text>
        </section>

        <section>
          <Text my={2} fontWeight={"bold"} as="p">
            This project is not affiliated with or endorsed by iRacing.com.
          </Text>
        </section>

        <section>
          <Heading mt={2}>The Creator</Heading>
          <Text as="p">
            My name is <strong>Adriano Lima</strong>, I am from Brazil and have
            been passionate about sim racing since 2010. I started with rFactor
            and later explored other simulators until I finally gave iRacing a
            chance in 2020. Sim racing has always been a hobby for me, but
            recently, I've been working to improve my driving techniques.
          </Text>
          <Text as="p" my={2}>
            As a software developer, I've always enjoyed exploring iRacing APIs.
            In the past, I created a Twitch bot and an Overlay prototype, and
            now I'm excited to present this project. Every season, I find myself
            wondering which tracks and cars to purchase. This tool was initially
            designed to address my own needs, but I hope it will also be helpful
            to the broader iRacing community.
          </Text>
        </section>

        <section>
          <Heading mt={2}>Contributors</Heading>
          <Text as="p">
            This project would not have been possible without the help and
            support of the following contributors:
          </Text>
          <List.Root>
            <For
              each={contributors}
              children={(c) => (
                <List.Item
                  key={c.github}
                  fontWeight={c.github === "adrianulima" ? "bold" : undefined}
                >
                  {c.name} (
                  <Link
                    href={`https://github.com/${c.github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{c.github}
                  </Link>
                  )
                </List.Item>
              )}
            />
          </List.Root>
        </section>

        <Heading size={"3xl"} mt={6}>
          Privacy Policy
        </Heading>
        <Text mb={2} as="p">
          Last updated: Wed 15 Jan, 2025
        </Text>
        <section>
          <Heading>Collected Data</Heading>
          <Text as="p">
            I do not collect or store any personal or sensitive data from users.
          </Text>
        </section>

        <section>
          <Heading mt={2}>LocalStorage</Heading>
          <Text as="p">
            This site uses your browser's localStorage to save UI settings like
            theme and also the tracks and cars mark as owned or wished.
          </Text>
          <Text my={2} as="p">
            This data is stored locally on your device and is not sent to the
            servers or shared with any third parties.
          </Text>
        </section>

        <section>
          <Heading mt={2}>Google Analytics</Heading>
          <Text as="p">I use Google Analytics to track:</Text>

          <List.Root>
            <List.Item>
              <strong>Page visits</strong> (Used to track the amount of visits
              the site receives)
            </List.Item>
            <List.Item>
              <strong>Outbound clicks</strong> (e.g., clicks on the "Checkout"
              button leading to the iRacing.com store page)
            </List.Item>
          </List.Root>
          <Text my={2} as="p">
            Google Analytics collects only aggregated and anonymized data. This
            information is used solely to understand how our site is being used
            and to improve the user experience.
          </Text>
        </section>

        <section>
          <Heading mt={2}>Third-Party Links</Heading>
          <Text as="p">
            This site contains a link to a third-party website (iRacing.com).
            Once leaving this site, the privacy practices and content of the
            external website are not controlled or managed by this site.
          </Text>
        </section>

        <section>
          <Heading mt={2}>Your Choices</Heading>
          <Text as="p">
            You can control your localStorage data by clearing your browser's
            cache.
          </Text>
          <Text my={2} as="p">
            To opt out of Google Analytics tracking, you can use the Google
            Analytics Opt-out Browser Add-on.
          </Text>
        </section>

        <section>
          <Heading mt={2}>Contact</Heading>
          <Text as="p">
            If you have any questions about this Privacy Policy, please contact
            me by{" "}
            <Tooltip
              lazyMount
              unmountOnExit
              content={"adrianulima@gmail.com"}
              showArrow
              positioning={{ placement: "top" }}
              openDelay={200}
              closeDelay={100}
            >
              <Link
                href="mailto:adrianulima@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                email
              </Link>
            </Tooltip>{" "}
            or create an issue at the{" "}
            <Link
              href="https://github.com/adrianulima/my-racing-planner"
              target="_blank"
              rel="noreferrer"
            >
              Github repository
            </Link>
            .
          </Text>
        </section>
      </Stack>
    </Stack>
  );
}

export default AboutPage;
