import { setMyCar, setMyTrack, setWishCar, setWishTrack } from "@/store/ir";
import { faBookmark, faSackXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, CheckboxProps } from "../ui/checkbox";

function ContentCheckbox({
  content,
  free,
  owned,
  wish,
  sku,
  ...rest
}: CheckboxProps & {
  content: "cars" | "tracks";
  free: boolean;
  owned: boolean;
  wish: boolean;
  sku: number;
}) {
  const [setMy, setWish] =
    content === "cars" ? [setMyCar, setWishCar] : [setMyTrack, setWishTrack];

  return (
    <Checkbox
      readOnly={free}
      colorPalette={free ? "green" : wish ? "blue" : undefined}
      checked={free || owned || wish}
      controlProps={{
        borderColor: !free && !wish && !owned ? "gray.400" : undefined,
      }}
      icon={
        free ? (
          <FontAwesomeIcon size="xs" icon={faSackXmark} />
        ) : wish ? (
          <FontAwesomeIcon size="xs" icon={faBookmark} />
        ) : undefined
      }
      onClick={(e) => e.stopPropagation()}
      onCheckedChange={() => {
        if (owned) {
          setMy(sku, false);
          setWish(sku, true);
        } else if (wish) {
          setWish(sku, false);
        } else {
          setMy(sku, true);
        }
      }}
      {...rest}
    />
  );
}

export default ContentCheckbox;
