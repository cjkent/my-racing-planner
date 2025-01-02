import {
  setMyCar,
  setMyTrack,
  setWishCar,
  setWishTrack,
  useIr,
} from "@/store/ir";
import { For, Table, Text } from "@chakra-ui/react";
import { faBookmark, faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CARS_JSON from "../../ir-data/cars.json";
import TRACKS_JSON from "../../ir-data/tracks.json";
import { Checkbox } from "../ui/checkbox";

function ContentPopover({
  content,
  list,
}: {
  content: string;
  list: number[];
}) {
  const [setMy, setWish] =
    content === "cars" ? [setMyCar, setWishCar] : [setMyTrack, setWishTrack];
  const contentList: any = content === "cars" ? CARS_JSON : TRACKS_JSON;
  const { wishCars, wishTracks, myCars, myTracks } = useIr();
  const [wishes, myContent] =
    content === "cars" ? [wishCars, myCars] : [wishTracks, myTracks];

  return (
    <Table.ScrollArea width="100%" maxH={"320px"}>
      <Table.Root size="sm" striped>
        <Table.Body fontSize={"xs"}>
          <For
            each={list}
            children={(item: number) => {
              const contentItem =
                contentList[item.toString() as keyof typeof contentList];
              const wish = wishes.includes(contentItem?.id);
              const owned = myContent.includes(contentItem?.id);
              return (
                contentItem && (
                  <Table.Row key={item}>
                    <Table.Cell w={"20px"} p={0} borderBottom={0} px={"4px"}>
                      <Checkbox
                        size={"xs"}
                        mt={"4px"}
                        readOnly={contentItem.free}
                        colorPalette={
                          contentItem.free ? "green" : wish ? "blue" : undefined
                        }
                        checked={contentItem.free || owned || wish}
                        controlProps={{
                          borderColor:
                            !contentItem.free && !wish && !owned
                              ? "gray.400"
                              : undefined,
                        }}
                        icon={
                          contentItem.free ? (
                            <FontAwesomeIcon size="xs" icon={faSackXmark} />
                          ) : wish ? (
                            <FontAwesomeIcon size="xs" icon={faBookmark} />
                          ) : undefined
                        }
                        onClick={(e) => e.stopPropagation()}
                        onCheckedChange={() => {
                          if (owned) {
                            setMy(contentItem.id, false);
                            setWish(contentItem.id, true);
                          } else if (wish) {
                            setWish(contentItem.id, false);
                          } else {
                            setMy(contentItem.id, true);
                          }
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell
                      width={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                      p={0}
                      borderBottom={0}
                      px={"4px"}
                      fontWeight={"bold"}
                      maxW={"284px"}
                    >
                      <Text truncate>{contentItem.name}</Text>
                    </Table.Cell>
                  </Table.Row>
                )
              );
            }}
          />
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
}

export default ContentPopover;
