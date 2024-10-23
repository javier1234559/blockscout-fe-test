import { memo } from "react";
import Image from "next/image";
import RouteNames from "service/constants/routes";
import AppLink from "components/common/app-link";
import { cn } from "service/utils/cn";
import { Heading } from "@chakra-ui/react";

interface Props {
  className?: string;
}

function Logo({ className = "" }: Props) {
  return (
    <AppLink
      href={RouteNames.Home}
      className={cn("flex items-center gap-2", className)}
    >
      <Image
        src="/images/logo.png"
        alt="STO Chain"
        width={50}
        height={50}
        priority
        className="aspect-square h-auto max-h-[3.125rem] w-full max-w-[3.125rem] object-contain"
      />
      <Heading
        as="h2"
        fontFamily="autowide"
        fontSize="xl"
        fontWeight="medium"
        lineHeight="tight"
        color="white"
      >
        STO Chain
      </Heading>
    </AppLink>
  );
}

export default memo(Logo);
