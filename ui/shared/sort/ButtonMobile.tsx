import { IconButton, chakra, Skeleton } from "@chakra-ui/react";
import React from "react";

import IconSvg from "ui/shared/IconSvg";

type Props = {
  onClick: () => void;
  isActive: boolean;
  className?: string;
  isLoading?: boolean;
};

const ButtonMobile = (
  { onClick, isActive, className, isLoading }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  if (isLoading) {
    return (
      <Skeleton className={className} w="36px" h="32px" borderRadius="base" />
    );
  }

  return (
    <IconButton
      ref={ref}
      icon={<IconSvg name="arrows/up-down" boxSize={5} />}
      aria-label="sort"
      size="sm"
      variant="outline"
      colorScheme="gray"
      minWidth="36px"
      onClick={onClick}
      isActive={isActive}
      display="flex"
      className={className}
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
    />
  );
};

export default chakra(React.forwardRef(ButtonMobile));
