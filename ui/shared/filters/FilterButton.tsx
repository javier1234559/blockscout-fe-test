import type { As } from "@chakra-ui/react";
import { Skeleton, Button, Circle, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import IconSvg from "ui/shared/IconSvg";

const FilterIcon = <IconSvg name="filter" boxSize={5} />;

interface Props {
  isActive?: boolean;
  isLoading?: boolean;
  appliedFiltersNum?: number;
  onClick: () => void;
  as?: As;
}

const FilterButton = (
  { isActive, isLoading, appliedFiltersNum, onClick, as }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const badgeColor = useColorModeValue("white", "black");
  const badgeBgColor = useColorModeValue("primary.DEFAULT", "gray.50");

  if (isLoading) {
    return (
      <Skeleton
        w={{ base: 9, lg: "78px" }}
        h={8}
        borderRadius="base"
        flexShrink={0}
      />
    );
  }

  const num = (
    <Circle
      className="AppliedFiltersNum"
      bg={isActive ? "primary.DEFAULT" : badgeBgColor}
      size={5}
      color={badgeColor}
    >
      {appliedFiltersNum}
    </Circle>
  );

  return (
    <Button
      ref={ref}
      rightIcon={appliedFiltersNum ? num : undefined}
      size="sm"
      fontWeight="500"
      variant="outline"
      colorScheme="gray"
      onClick={onClick}
      isActive={isActive}
      data-selected={Boolean(appliedFiltersNum)}
      px={1.5}
      flexShrink={0}
      as={as}
      pointerEvents="all"
      h="3rem"
      border="1px solid"
      color="primary.DEFAULT"
      borderColor="gray.700"
      borderRadius="sm"
      _focus={{
        borderColor: "primary.DEFAULT",
        boxShadow: "none",
        outline: "none",
        border: "1px solid",
      }}
      _hover={{
        borderColor: "primary.DEFAULT",
        boxShadow: "none",
        outline: "none",
        color: "primary.DEFAULT",
        border: "1px solid",
      }}
      _disabled={{
        borderColor: "gray.400",
        opacity: "0.2",
        color: "white",
      }}
      minW="3rem"
    >
      {FilterIcon}
      {/* <Box display={{ base: 'none', lg: 'block' }}>Filter</Box> */}
    </Button>
  );
};

export default React.forwardRef(FilterButton);
