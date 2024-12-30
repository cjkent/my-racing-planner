import {
  faArrowUpRightFromSquare,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../ui/button";

function InfoButton({ href }: { href: string }) {
  return (
    <Button
      colorPalette={"blue"}
      size="xs"
      p="0 8px"
      height={"24px"}
      as={"a"}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <FontAwesomeIcon icon={faInfoCircle} />
      <span>
        Info
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
      </span>
    </Button>
  );
}

export default InfoButton;
