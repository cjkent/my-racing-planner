import { Flex, Table, Text } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

function SeasonTableRowDateCell({
  date,
  thisWeek,
  weekNumber,
}: {
  date: string;
  thisWeek: boolean;
  weekNumber: number;
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
        <Flex direction="column" alignItems="center">
          <Text textAlign={"center"}>
            {weekStart.toLocaleDateString("en-US", shortFormat)}
          </Text>
          <Text fontSize="xs" textAlign="center" opacity="0.8">
            (week {weekNumber})
          </Text>
        </Flex>
      </Tooltip>
    </Table.Cell>
  );
}

export default SeasonTableRowDateCell;
