import { Box } from "@chakra-ui/react";
import {
  faLanguage,
  faMoon,
  faShareFromSquare,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExportDialog from "../export/export-dialog";
import { Avatar } from "../ui/avatar";
import { useColorMode } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";

function UserDropdown() {
  const { colorMode, toggleColorMode } = useColorMode();
  // const signedIn = false;
  return (
    <MenuRoot>
      <MenuTrigger cursor={"pointer"}>
        <Avatar
          // name="Adriano Lima"
          // src="link-to-avatar"
          shape="rounded"
          colorPalette={"bg"}
          size="sm"
        />
      </MenuTrigger>
      <MenuContent>
        {/* {!signedIn && (
          <MenuItem value="login" valueText="Log In" disabled>
            <Box w={"1rem"}>
              <FontAwesomeIcon icon={faRightToBracket} />
            </Box>
            <Box flex="1">Log In</Box>
          </MenuItem>
        )} */}

        <MenuItem value="language" valueText="Language" disabled>
          <Box w={"1rem"}>
            <FontAwesomeIcon icon={faLanguage} />
          </Box>
          <Box flex="1">Language</Box>
        </MenuItem>

        <MenuItem
          value="toggle-theme"
          valueText="Toggle Theme"
          onClick={toggleColorMode}
        >
          <Box w={"1rem"}>
            <FontAwesomeIcon icon={colorMode === "light" ? faSun : faMoon} />
          </Box>
          <Box flex="1">Color Mode</Box>
        </MenuItem>

        <ExportDialog>
          <MenuItem value="export" valueText="Export My Content">
            <Box w={"1rem"}>
              <FontAwesomeIcon icon={faShareFromSquare} />
            </Box>
            <Box flex="1">Export My Content</Box>
          </MenuItem>
        </ExportDialog>

        {/* {signedIn && (
          <MenuItem value="logout" valueText="Log Out">
            <Box w={"1rem"}>
              <FontAwesomeIcon icon={faPowerOff} />
            </Box>
            <Box flex="1">Log Out</Box>
          </MenuItem>
        )} */}
      </MenuContent>
    </MenuRoot>
  );
}

export default UserDropdown;
