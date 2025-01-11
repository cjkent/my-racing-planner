import { Box, Em, Heading, Separator, Text } from "@chakra-ui/react";
import {
  faBookmark,
  faCar,
  faFlagCheckered,
  faGears,
  faLanguage,
  faMoon,
  faMugHot,
  faRoad,
  faSackXmark,
  faShoppingBag,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "../ui/checkbox";

function HelpContent() {
  return (
    <>
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
          <Em>My Tracks</Em> <FontAwesomeIcon size="xs" icon={faRoad} /> Pages
        </Heading>

        <Text as="p">
          These pages allow you to see the details of each content and to select
          the content you <strong>own</strong> and the content you{" "}
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
          The app uses a unique checkbox system to help you manage your iRacing
          content. The checkbox has four states:
        </Text>
        <ol>
          <li>
            <Checkbox
              mr={2}
              size={"sm"}
              readOnly={true}
              checked={false}
              controlProps={{ borderColor: "gray.400" }}
            />
            <strong>Unchecked</strong>: The content is not owned or wishlist.
          </li>
          <li>
            <Checkbox mr={2} size={"sm"} readOnly={true} checked={true} />
            <strong>Checked (Owned)</strong>: Indicates content you already own.
          </li>
          <li>
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
          </li>
          <li>
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
          </li>
        </ol>
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
          The season page is the central hub of the app and the first page you
          will see when you open it.
        </Text>
        <Text my={2} as="p">
          Once you select your favorite series, this page displays a
          comprehensive table of series and the tracks and cars they use.
        </Text>

        <ul>
          <li>
            <strong>Red cells</strong>: Represent the tracks you don't own.
          </li>
          <li>
            <strong>Green cells</strong>: Represent the free tracks or that you
            own.
          </li>
          <li>
            <strong>Blue cells</strong>: Represent the tracks you added to your
            wishlist.
          </li>
        </ul>

        <Heading my={2} size={"md"}>
          Use the table options <FontAwesomeIcon size="xs" icon={faGears} />
        </Heading>

        <ul>
          <li>
            <strong>Drag and drop to reorder</strong>: Enable columns drag and
            drop to reorder series
          </li>
          <li>
            <strong>Show content checkboxes</strong>: Show track checkboxes to
            quickly switch tracks you own
          </li>
          <li>
            <strong>Show cars dropdown</strong>: Show cars dropdown to quickly
            switch cars you own
          </li>
          <li>
            <strong>Highlight on track hover</strong>: Highlight all cells with
            the same hovered track
          </li>
          <li>
            <strong>Show wishlist</strong>: Either wishlist items should be
            colored
          </li>
          <li>
            <strong>Show owned</strong>: Either owned items should be colored
          </li>
        </ul>
      </section>

      <Separator my={3} />

      <section>
        <Heading mt={2}>
          Checkout at the <Em>Shop Guide</Em>{" "}
          <FontAwesomeIcon size="xs" icon={faShoppingBag} /> Page
        </Heading>
        <Text mb={2} as="p">
          See the list of all non-free used tracks of the current season, and
          you have one more place to wishlist content.
        </Text>
        <Text my={2} as="p">
          All wishlist items will be presented as a cart with the total price
          and discount if applicable. Use the <strong>Checkout Button</strong>{" "}
          to complete the purchase at the
          <Em>iRacing.com</Em> store.
        </Text>
        <Text my={2} fontWeight={"bold"} as="p">
          This project is not affiliated with or endorsed by iRacing.com.
        </Text>
      </section>

      <Separator my={3} />

      <section>
        <Heading mt={2}>More</Heading>
        <ul>
          <li>
            <strong>
              Language <FontAwesomeIcon size="xs" icon={faLanguage} />
            </strong>
            : Choose your preferred language
          </li>
          <li>
            <strong>
              Theme <FontAwesomeIcon size="xs" icon={faMoon} />
            </strong>
            : Choose your theme from light and dark options.
          </li>
          <li>
            <strong>
              Buy me a coffee <FontAwesomeIcon size="xs" icon={faMugHot} />
            </strong>
            : Contribute by donating to the project.
          </li>
        </ul>
      </section>
    </>
  );
}

export default HelpContent;
