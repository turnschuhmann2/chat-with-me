import { theme } from "@/styles/theme";
import clsx from "clsx";

export type FontColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "default"
  | "neutral"
  | "accent";

export function TypographyBody(props: {
  color: FontColors;
  children: React.ReactNode;
}) {
  return (
    <p className={clsx("text-base font-normal", `text-${props.color}Content`)}>
      {props.children}
    </p>
  );
}

export function TypographyLabel(props: {
  color: FontColors;
  children: React.ReactNode;
}) {
  return <span className="text-xs font-normal">{props.children}</span>;
}
