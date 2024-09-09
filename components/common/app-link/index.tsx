/* eslint-disable react/jsx-props-no-spreading */

"use client";

import React from "react";
import isEqual from "react-fast-compare";
import Link from "next/link";
import { cn } from "service/utils/cn";

interface Props {
  href: string;
  className?: string;
  onClick?: () => void;
}

function AppLink(props: React.PropsWithChildren<Props>) {
  const { href, children, className = "", onClick, ...others } = props;

  const uuid = React.useId();

  // const pathname = usePathname();
  // const locale = pathname.split("/")[1];
  // const finalLink = `/${forceLanguage || locale}${href}`

  return (
    <Link
      {...others}
      href={href as any}
      key={uuid}
      onClick={onClick}
      className={cn("duration-300", className)}
    >
      {children}
    </Link>
  );
}

export default React.memo(AppLink, isEqual);
