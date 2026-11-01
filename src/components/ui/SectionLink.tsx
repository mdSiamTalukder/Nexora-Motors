"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";

interface SectionLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> {
  sectionId: string;
  onNavigate?: () => void;
  focusTarget?: boolean;
}

function removeHashFromUrl() {
  if (!window.location.hash) {
    return;
  }

  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, "", `${pathname}${search}`);
}

export function SectionLink({
  sectionId,
  onNavigate,
  focusTarget = false,
  children,
  ...props
}: SectionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    event.preventDefault();
    removeHashFromUrl();
    onNavigate?.();

    requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });

      if (focusTarget) {
        target.focus({ preventScroll: true });
      }
    });
  };

  return (
    <a href={`#${sectionId}`} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
