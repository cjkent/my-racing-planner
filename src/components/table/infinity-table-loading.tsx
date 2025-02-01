import { Flex, Spinner, Table } from "@chakra-ui/react";

function InfinityTableLoading() {
  return (
    <Table.Row bgColor={"transparent"}>
      <Table.Cell colSpan={8} minWidth={"100%"}>
        <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
          <Spinner size={"md"} borderWidth="2px" />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
}

export default InfinityTableLoading;
