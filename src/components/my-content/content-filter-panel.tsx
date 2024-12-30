import { CategoryIcon } from "@/ir-data/utils/icons";
import { Input, Stack, Tabs } from "@chakra-ui/react";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { InputGroup } from "../ui/input-group";

function ContentFilterPanel<T extends string>({
  tabs,
  tab,
  onTabChange,
  onSearchChange,
}: {
  tabs: { [key: string]: string };
  tab: T;
  onTabChange: (value: T) => void;
  onSearchChange: (value: string) => void;
}) {
  const [search, setSearch] = useState<string>("");

  const setSearchWrapper = (newValue: string) => {
    setSearch(newValue);
    onSearchChange(newValue);
  };

  return (
    <Stack
      justifyContent={{ md: "space-between", base: "center" }}
      alignItems={"center"}
      direction={{ base: "column", md: "row" }}
    >
      <InputGroup
        width={"360px"}
        maxWidth={"100%"}
        startElement={<FontAwesomeIcon icon={faSearch} />}
        endElement={
          !!search.trim() ? (
            <FontAwesomeIcon
              onClick={() => setSearchWrapper("")}
              cursor={"pointer"}
              icon={faCircleXmark}
            />
          ) : undefined
        }
      >
        <Input
          placeholder="Search"
          variant="subtle"
          value={search}
          onChange={(e) => setSearchWrapper(e.target.value)}
        />
      </InputGroup>
      <Tabs.Root
        size={"sm"}
        value={tab}
        onValueChange={(e) => onTabChange(e.value as T)}
        variant={"enclosed"}
      >
        <Tabs.List>
          {Object.entries(tabs).map(([k, tab]: [string, string]) => (
            <Tabs.Trigger value={tab} key={tab}>
              <CategoryIcon category={k} />
              {tab}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Stack>
  );
}

export default ContentFilterPanel;
