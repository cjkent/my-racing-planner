import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useWindowSize from "@/hooks/useWindowSize";
import { ETabs, setHelpPresented, useUi } from "@/store/ui";
import {
  Box,
  Em,
  Heading,
  Link,
  List,
  Separator,
  Text,
} from "@chakra-ui/react";
import {
  faBookmark,
  faCar,
  faFileShield,
  faFlagCheckered,
  faGears,
  faLanguage,
  faMessage,
  faMoon,
  faMugHot,
  faRoad,
  faSackXmark,
  faShoppingBag,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, useEffect, useState } from "react";
import { Link as LinkWouter, useLocation } from "wouter";
import { Checkbox } from "../ui/checkbox";
import { Tooltip } from "../ui/tooltip";

function HelpDialog({ children }: PropsWithChildren) {
  const { helpPresented } = useUi();
  const [open, setOpen] = useState(!helpPresented);

  const { size } = useWindowSize();

  const [_, navigate] = useLocation();

  useEffect(() => {
    if (!helpPresented) {
      setOpen(true);
      setHelpPresented(true);
      navigate(ETabs.MySeries);
    }
  }, [helpPresented]);

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={size.md ? "lg" : "full"}
      scrollBehavior="inside"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader textAlign={"center"}>
          <DialogTitle>Welcome to My Racing Planner</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: 4, md: 10 }} textAlign={"justify"}>
          <section>
            <Heading mt={2}>
              Start with <Em>My Series</Em> Page{" "}
              <FontAwesomeIcon size="xs" icon={faFlagCheckered} />
            </Heading>

            <Text as="p">
              Select your favorite series. Your chosen series will appear at the
              Season Planner page.
            </Text>
            <Text as="p">Use the Start Checkbox to mark your favorites</Text>

            <Box my={3} />

            <Heading mt={2} size={"md"}>
              <Em>My Cars</Em> <FontAwesomeIcon size="xs" icon={faCar} /> and{" "}
              <Em>My Tracks</Em> <FontAwesomeIcon size="xs" icon={faRoad} />{" "}
              Pages
            </Heading>

            <Text as="p">
              These pages allow you to see the details of each content and to
              select the content you <strong>own</strong> and the content you{" "}
              <strong>wish</strong>.
            </Text>
            <Text as="p">
              Your selections on these pages will directly reflect on the Season
              Planner Page, helping you analyze your content more effectively.
            </Text>
          </section>
          <section>
            <Heading mt={2} size={"md"}>
              Wishlist and Checkbox States
            </Heading>
            <Text mb={2} as="p">
              The app uses a unique checkbox system to help you manage your
              iRacing content. The checkbox has four states:
            </Text>
            <List.Root variant="plain">
              <List.Item>
                <Checkbox
                  mr={2}
                  size={"sm"}
                  readOnly={true}
                  checked={false}
                  controlProps={{ borderColor: "gray.400" }}
                />
                <strong>Unchecked</strong>: The content is not owned or
                wishlist.
              </List.Item>
              <List.Item>
                <Checkbox mr={2} size={"sm"} readOnly={true} checked={true} />
                <strong>Checked (Owned)</strong>: Indicates content you already
                own.
              </List.Item>
              <List.Item>
                <Checkbox
                  mr={2}
                  size={"sm"}
                  readOnly={true}
                  colorPalette={"blue"}
                  checked={true}
                  icon={<FontAwesomeIcon size="xs" icon={faBookmark} />}
                />
                <strong>Checked (Wishlist)</strong>: Marks content you wish to
                purchase.
              </List.Item>
              <List.Item>
                <Checkbox
                  mr={2}
                  size={"sm"}
                  readOnly={true}
                  colorPalette={"green"}
                  checked={true}
                  icon={<FontAwesomeIcon size="xs" icon={faSackXmark} />}
                />
                <strong>Checked (Free)</strong>: Marks content included for free
                with the iRacing subscription.
              </List.Item>
            </List.Root>
            <Text my={2} as="p">
              Keep clicking to cycle all states.
            </Text>
          </section>
          <Separator my={3} />
          <section>
            <Heading mt={2}>
              The <Em>My Season</Em>{" "}
              <FontAwesomeIcon size="xs" icon={faTableCellsLarge} /> Page
            </Heading>
            <Text as="p">
              The season page is the central hub of the app and the first page
              you will see when you open it.
            </Text>
            <Text my={2} as="p">
              Once you select your favorite series, this page displays a
              comprehensive table of series and the tracks and cars they use.
            </Text>

            <List.Root>
              <List.Item>
                <strong>Red cells</strong>: Represent the tracks you don't own.
              </List.Item>
              <List.Item>
                <strong>Green cells</strong>: Represent the tracks free with
                subscription.
              </List.Item>
              <List.Item>
                <strong>Teal cells</strong>: Represent the tracks you own.
              </List.Item>
              <List.Item>
                <strong>Blue cells</strong>: Represent the tracks you added to
                your wishlist.
              </List.Item>
            </List.Root>

            <Heading mt={2} size={"md"}>
              Use the table options <FontAwesomeIcon size="xs" icon={faGears} />
            </Heading>

            <List.Root>
              <List.Item>
                <strong>Drag and drop to reorder</strong>: Enable columns drag
                and drop to reorder series
              </List.Item>
              <List.Item>
                <strong>Show content checkboxes</strong>: Show track checkboxes
                to quickly switch tracks you own
              </List.Item>
              <List.Item>
                <strong>Show cars dropdown</strong>: Show cars dropdown to
                quickly switch cars you own
              </List.Item>
              <List.Item>
                <strong>Highlight on track hover</strong>: Highlight all cells
                with the same hovered track
              </List.Item>
              <List.Item>
                <strong>Show wishlist</strong>: Either wishlist items should be
                colored
              </List.Item>
              <List.Item>
                <strong>Show owned</strong>: Either owned items should be
                colored
              </List.Item>
            </List.Root>
          </section>
          <Separator my={3} />
          <section>
            <Heading mt={2}>
              Checkout at the <Em>Shop Guide</Em>{" "}
              <FontAwesomeIcon size="xs" icon={faShoppingBag} /> Page
            </Heading>
            <Text mb={2} as="p">
              See the list of all non-free used tracks of the current season,
              and you have one more place to wishlist content.
            </Text>
            <Text my={2} as="p">
              All wishlist items will be presented as a cart with the total
              price and discount if applicable. Use the{" "}
              <strong>Checkout Button</strong> to complete the purchase at the
              <Em>iRacing.com</Em> store.
            </Text>
            <Text my={2} fontWeight={"bold"} as="p">
              This project is not affiliated with or endorsed by iRacing.com.
            </Text>
          </section>
          <Separator my={3} />
          <section>
            <Heading mt={2}>More</Heading>
            <List.Root>
              <List.Item>
                <strong>
                  Language <FontAwesomeIcon size="xs" icon={faLanguage} />
                </strong>
                : Choose your preferred language
              </List.Item>
              <List.Item>
                <strong>
                  Theme <FontAwesomeIcon size="xs" icon={faMoon} />
                </strong>
                : Choose your theme from light and dark options.
              </List.Item>
              <List.Item>
                <strong>
                  Privacy <FontAwesomeIcon size="xs" icon={faFileShield} />
                </strong>
                : No personal data collected, visit the{" "}
                <LinkWouter to="/about">Privacy Policy</LinkWouter> for detail.
              </List.Item>
              <List.Item>
                <strong>
                  Buy me a coffee <FontAwesomeIcon size="xs" icon={faMugHot} />
                </strong>
                : Contribute by donating to the project.
              </List.Item>
              <List.Item>
                <strong>
                  Give your feedback{" "}
                  <FontAwesomeIcon size="xs" icon={faMessage} />
                </strong>
                : Send me an{" "}
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
              </List.Item>
            </List.Root>
          </section>
          <Separator my={3} />
          <section>
            <Heading mt={2}>Add to Home Screen (Mobile)</Heading>
            <Text mb={2} as="p">
              This site can be installed as a Progressive Web App (PWA) for a
              more app-like experience. Follow the steps below to add it to your
              home screen:
            </Text>

            <Heading mt={2} size={"md"}>
              For iOS (Safari)
            </Heading>
            <List.Root as="ol">
              <List.Item>
                Open this site in Safari on an iPhone or iPad.
              </List.Item>
              <List.Item>
                Tap the Share button (the square icon with an arrow pointing
                up).
              </List.Item>
              <List.Item>Scroll down and select Add to Home Screen.</List.Item>
              <List.Item>
                Confirm by tapping Add in the top-right corner.
              </List.Item>
            </List.Root>

            <Heading mt={2} size={"md"}>
              For Android (Chrome)
            </Heading>
            <List.Root as="ol">
              <List.Item>
                Open this site in Chrome on an Android device.
              </List.Item>
              <List.Item>
                Tap the Menu button (three dots in the top-right corner)).
              </List.Item>
              <List.Item>Select Add to Home Screen.</List.Item>
              <List.Item>
                Confirm by tapping Add and choose whether to add it
                automatically or manually.
              </List.Item>
            </List.Root>
            <Text my={2} as="p">
              After adding, the PWA will appear on the home screen and behave
              like a native app, offering a seamless experience.
            </Text>
          </section>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default HelpDialog;
