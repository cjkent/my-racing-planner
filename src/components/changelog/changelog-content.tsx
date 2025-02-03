import { setChangelogRead } from "@/store/notifications";
import { Heading, List, Text } from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";
import { useEffect } from "react";

function ChangelogContent() {
  useEffect(setChangelogRead, []);
  return (
    <Markdown
      options={{
        overrides: {
          h1: { component: "h1", props: { hidden: true } },
          h2: { component: Heading, props: { size: "md", mt: 2 } },
          p: { component: Text },
          ul: { component: List.Root },
          li: { component: List.Item },
        },
      }}
    >
      {CHANGELOG}
    </Markdown>
  );
}

export default ChangelogContent;
