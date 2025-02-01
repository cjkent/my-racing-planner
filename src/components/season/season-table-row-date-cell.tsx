import { Table, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

function SeasonTableRowDateCell({
  date,
  thisWeek,
}: {
  date: string;
  thisWeek: boolean;
}) {
  const locale = "en-US";
  const longFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const shortFormat: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const weekStart = new Date(date);
  const weekEndDay = new Date(
    new Date(weekStart).setUTCDate(weekStart.getDate() + 7),
  );

  return (
    <Table.Cell
      width="60px"
      bgColor={thisWeek ? "bg.inverted" : "bg.muted"}
      color={thisWeek ? "bg" : undefined}
      position={"sticky"}
      left={"0"}
      zIndex="docked"
    >
      <Tooltip
        lazyMount
        unmountOnExit
        content={`${weekStart.toLocaleDateString(
          locale,
          longFormat,
        )} - ${weekEndDay.toLocaleDateString(locale, longFormat)}`}
        showArrow
        positioning={{ placement: "top" }}
        openDelay={200}
        closeDelay={100}
      >
        <Text textAlign={"right"}>
          {weekStart.toLocaleDateString("en-US", shortFormat)}
        </Text>
      </Tooltip>
    </Table.Cell>
  );
}

export default SeasonTableRowDateCell;
