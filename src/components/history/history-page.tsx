import { EHistorySince, getSortedHistory } from "@/ir-data/utils/history";
import { ECarCategories } from "@/ir-data/utils/types";
import { useIr } from "@/store/ir";
import { useEffect, useState } from "react";
import TRACKS_JSON from "../../ir-data/tracks.json";
import Page from "../page/page";
import PageHeader from "../page/page-header";
import HistoryFilterPanel from "./history-filter-panel";
import HistoryTable from "./history-table";
import HistoryTableRow from "./history-table-row";

function HistoryPage() {
  const [tabCategory, setTabCategory] = useState<ECarCategories>(
    ECarCategories.all,
  );
  const [since, setSince] = useState<EHistorySince>(EHistorySince.Ever);
  const [list, setList] = useState(
    getSortedHistory(ECarCategories.all, EHistorySince.Ever),
  );

  useEffect(() => {
    const filteredContent = getSortedHistory(tabCategory, since);
    setList(filteredContent);
  }, [tabCategory, since]);

  const { wishTracks, myTracks } = useIr();

  return (
    <Page>
      <PageHeader
        title="Tracks Usage History"
        description="See the most used tracks of all time by iRacing"
      />
      <HistoryFilterPanel
        tabs={ECarCategories}
        tab={tabCategory}
        onTabChange={setTabCategory}
        since={since}
        onSinceChange={setSince}
      />

      <HistoryTable
        list={list}
        rows={(item) => {
          const track =
            TRACKS_JSON[item.id.toString() as keyof typeof TRACKS_JSON];
          if (!track) {
            return null;
          }
          const owned = myTracks.includes(item.sku);
          const wished = !owned && wishTracks.includes(item.sku);
          return (
            <HistoryTableRow
              key={item.id}
              id={track.id}
              sku={item.sku}
              name={track.name}
              logo={track.logo}
              free={track.free}
              count={item.count}
              categories={track.categories}
              owned={owned}
              wish={wished}
              released={item.released}
              usagePerYear={item.usagePerYear}
            />
          );
        }}
      />
    </Page>
  );
}

export default HistoryPage;
