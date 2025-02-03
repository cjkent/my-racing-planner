import { CategoryIcon } from "@/ir-data/utils/icons";
import { HStack, IconButton, Input, Tabs, Text } from "@chakra-ui/react";
import { faCircleXmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppLayout } from "../app/useAppLayout";
import { InputGroup } from "../ui/input-group";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";

function ContentFilterPanel<T extends string>({
  tabs,
  tab,
  search,
  onTabChange,
  onSearchChange,
}: {
  tabs: { [key: string]: string };
  tab: T;
  search: string;
  onTabChange: (value: T) => void;
  onSearchChange: (value: string) => void;
}) {
  const {
    screen: { width },
  } = useAppLayout();

  const setSearchWrapper = (newValue: string) => {
    onSearchChange(newValue);
  };

  return (
    <HStack justifyContent={{ md: "space-between", base: "center" }} mb={2}>
      <PopoverRoot
        open={!!search?.trim() ? true : undefined}
        positioning={{ placement: width.md ? "right" : "top-start" }}
      >
        <PopoverTrigger asChild>
          <IconButton
            aria-label="Search"
            variant={"outline"}
            size={"lg"}
            bgColor={{ base: "bg.muted", _hover: "bg" }}
            borderRadius={"md"}
          >
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <InputGroup
            width={"360px"}
            maxWidth={"100%"}
            startElement={<FontAwesomeIcon icon={faSearch} />}
            endElement={
              !!search?.trim() ? (
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
        </PopoverContent>
      </PopoverRoot>

      <Tabs.Root
        size={"sm"}
        value={tab}
        onValueChange={(e) => onTabChange(e.value as T)}
        variant={"enclosed"}
        width={{ md: "unset", base: "100%" }}
        flex={{ md: "unset", base: 1 }}
      >
        <Tabs.List
          flex={{ md: "unset", base: 1 }}
          width={{ md: "unset", base: "100%" }}
        >
          {Object.entries(tabs).map(([k, tab]: [string, string]) => (
            <Tabs.Trigger
              value={tab}
              key={tab}
              width={{ md: "unset", base: "100%" }}
            >
              <CategoryIcon category={k} />
              <Text
                hideBelow={tab === "All" ? undefined : "md"}
                textWrap={"nowrap"}
                userSelect={"none"}
              >
                {tab}
              </Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </HStack>
  );
}

export default ContentFilterPanel;
