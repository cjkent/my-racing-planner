import useDebounce from "@/hooks/useDebounce";
import { TContent } from "@/ir-data/utils/types";
import { Flex } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ContentFilterPanel from "./content-filter-panel";
import ContentHeader from "./content-header";
import ContentTable from "./content-table";
import ContentTableRow from "./content-table-row";

function ContentPage({
  allTab,
  content,
  contentListJson,
  description,
  favorites,
  freeCount,
  infoUrl,
  myContent,
  skuIcon,
  tabs,
  title,
  wish,
}: {
  allTab: string;
  content: "cars" | "tracks";
  contentListJson: TContent[];
  description: string;
  favorites: number[];
  freeCount: number;
  infoUrl: (id: number) => string;
  myContent: number[];
  skuIcon: IconDefinition;
  tabs: { [key: string]: string };
  title: string;
  wish: number[];
}) {
  const [tabCategory, setTabCategory] = useState<string>(allTab);
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState(contentListJson);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const filteredContent =
      tabCategory === allTab
        ? contentListJson
        : contentListJson.filter((content: any) =>
            content.categories.some((v: string) => tabs[v] === tabCategory),
          );
    const trimmedSearch = debouncedSearch
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const filteredContentWithSearch = !!trimmedSearch
      ? filteredContent.filter((content) =>
          content.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(trimmedSearch),
        )
      : filteredContent;

    setList(filteredContentWithSearch);
  }, [debouncedSearch, tabCategory]);

  return (
    <Flex direction="column" height="100%" width="100%" gap="8px">
      <ContentHeader
        freeCount={freeCount}
        ownedCount={myContent.length ?? 0}
        wishCount={wish.length ?? 0}
        title={title}
        description={description}
      />

      <ContentFilterPanel
        tabs={tabs}
        tab={tabCategory}
        onTabChange={setTabCategory}
        onSearchChange={setSearch}
      />

      <ContentTable
        list={list}
        children={(item) => (
          <ContentTableRow
            key={item.id}
            content={content}
            infoUrl={infoUrl(item.id)}
            skuIcon={skuIcon}
            id={item.id}
            price={item.price}
            name={item.name}
            logo={item.logo}
            categories={item.categories}
            free={item.free}
            skuGroup={item.skuGroup ? Object.values(item.skuGroup) : undefined}
            series={item.series}
            owned={myContent.includes(item.id)}
            favorite={favorites.includes(item.id)}
            wish={wish.includes(item.id)}
          />
        )}
      />
    </Flex>
  );
}

export default ContentPage;
