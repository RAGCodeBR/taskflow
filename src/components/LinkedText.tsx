import { Fragment } from "react";
import { findTextLinks } from "@/lib/text-links";
import { cn } from "@/lib/utils";

export function LinkedText({ text, className }: { text: string; className?: string }) {
  const links = findTextLinks(text);
  if (!links.length) return <>{text}</>;
  let cursor = 0;
  const parts = links.map((link) => {
    const prefix = text.slice(cursor, link.start);
    cursor = link.end;
    return (
      <Fragment key={link.start}>
        {prefix}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("cursor-pointer underline underline-offset-2 hover:opacity-80", className)}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {link.text}
        </a>
      </Fragment>
    );
  });
  return (
    <>
      {parts}
      {text.slice(cursor)}
    </>
  );
}

/** Native inputs remain editable; web addresses get a separate clickable shortcut. */
export function FieldLinks({ value }: { value: string | null | undefined }) {
  const links = findTextLinks(value ?? "");
  const uniqueLinks = [...new Map(links.map((link) => [link.href, link])).values()];
  if (!uniqueLinks.length) return null;
  return (
    <div
      className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-primary"
      aria-label="Links deste campo"
    >
      {uniqueLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-full cursor-pointer break-all underline underline-offset-2 hover:opacity-80"
          onPointerDown={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.preventDefault()}
          onClick={(event) => event.stopPropagation()}
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}
