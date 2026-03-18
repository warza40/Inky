"use client";

import { useRef, useEffect } from "react";
import FolderStack from "./FolderStack.js";

export type FolderStackTagColor = "red" | "blue" | "green" | "purple" | "amber";

export interface FolderStackCard {
  title: string;
  sub: string;
  tag: string;
  tagColor: FolderStackTagColor;
  image?: string;
  palette?: [string, string, string];
}

export interface FolderStackTabs {
  work?: FolderStackCard[];
  experiments?: FolderStackCard[];
  reads?: FolderStackCard[];
}

export interface FolderStackReactProps {
  accentColor?: string;
  accentText?: string;
  idleReset?: number;
  tabLabels?: { work?: string; experiments?: string; reads?: string };
  tabs?: FolderStackTabs;
}

export function FolderStackReact({
  accentColor,
  accentText,
  idleReset,
  tabLabels,
  tabs,
}: FolderStackReactProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const fsRef = useRef<InstanceType<typeof FolderStack> | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const config: Record<string, unknown> = {};
    if (accentColor != null) config.accentColor = accentColor;
    if (accentText != null) config.accentText = accentText;
    if (idleReset != null) config.idleReset = idleReset;
    if (tabLabels != null) config.tabLabels = tabLabels;
    if (tabs != null) config.tabs = tabs;
    fsRef.current = new FolderStack(ref.current, config);
    return () => {
      fsRef.current?.destroy();
      fsRef.current = null;
    };
  }, [accentColor, accentText, idleReset, tabLabels, tabs]);

  return <div ref={ref} className="folder-stack-root" />;
}
