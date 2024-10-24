import { Box, Text, chakra } from "@chakra-ui/react";
import React from "react";

import EmptySearchResult from "ui/shared/EmptySearchResult";

import DataFetchAlert from "./DataFetchAlert";
import { Container } from "ui/shared/layout/components";

type FilterProps = {
  hasActiveFilters: boolean;
  emptyFilteredText: string;
};

type Props = {
  isError: boolean;
  items?: Array<unknown>;
  emptyText: string | React.ReactNode;
  actionBar?: React.ReactNode;
  showActionBarIfEmpty?: boolean;
  content: React.ReactNode;
  className?: string;
  filterProps?: FilterProps;
};

const DataListDisplay = (props: Props) => {
  if (props.isError) {
    return <DataFetchAlert className={props.className} />;
  }

  if (props.filterProps?.hasActiveFilters && !props.items?.length) {
    return (
      <Box className={props.className}>
        {props.actionBar}
        <EmptySearchResult text={props.filterProps.emptyFilteredText} />
      </Box>
    );
  }

  if (!props.items?.length) {
    return (
      <>
        {props.showActionBarIfEmpty && props.actionBar}
        {props.emptyText && (
          <Text className={props.className}>{props.emptyText}</Text>
        )}
      </>
    );
  }

  return (
    <Container p={{ base: 4, lg: 0 }}>
      <Box className={props.className}>
        {props.actionBar}
        {props.content}
      </Box>
    </Container>
  );
};

export default chakra(DataListDisplay);
