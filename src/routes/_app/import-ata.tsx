import { createFileRoute } from "@tanstack/react-router";
import { ImportAtaContent } from "@/components/ImportAtaContent";

export const Route = createFileRoute("/_app/import-ata")({
  component: ImportAtaContent,
});
