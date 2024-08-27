import { Box, chakra } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <Box
      className={className}
      maxW="container.xl"
      width="100%"
      mx="auto"
      px={{ base: 2, lg: 0 }}
    >
      {children}
    </Box>
  );
};

export default React.memo(chakra(Container));
