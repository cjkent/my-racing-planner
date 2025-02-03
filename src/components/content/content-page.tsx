import useDebounce from "@/hooks/useDebounce";
import { TContent } from "@/ir-data/utils/types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import ContentFilterPanel from "./content-filter-panel";
import ContentSubPage from "./content-sub-page";
import ContentTable from "./content-table";
import ContentTableRow from "./content-table-row";

function ContentPage({
  allTab,
  content,
  contentListJson,
  description,
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
    <Page>
      <PageHeader
        freeCount={freeCount}
        ownedCount={myContent.length ?? 0}
        wishCount={wish.length ?? 0}
        title={title}
        description={description}
      >
        <ContentSubPage hideFrom={"md"} />
      </PageHeader>

      <ContentFilterPanel
        tabs={tabs}
        tab={tabCategory}
        onTabChange={setTabCategory}
        search={search}
        onSearchChange={setSearch}
      />

      <ContentTable
        list={list}
        rows={(item) => {
          const owned = myContent.includes(item.sku);
          const wished = !owned && wish.includes(item.sku);
          return (
            <ContentTableRow
              key={item.id}
              id={item.id}
              sku={item.sku}
              content={content}
              infoUrl={infoUrl(item.id)}
              skuIcon={skuIcon}
              price={item.price}
              name={item.name}
              logo={item.logo}
              categories={item.categories}
              free={item.free}
              skuGroup={item.skuGroup}
              series={item.skuSeries ? item.skuSeries : item.series}
              owned={owned}
              wish={wished}
            />
          );
        }}
      />
    </Page>
  );
}

export default ContentPage;
