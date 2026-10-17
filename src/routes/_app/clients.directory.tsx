import { createFileRoute } from "@tanstack/react-router";
import { ClientsIndexPage } from "./clients";

export const Route = createFileRoute("/_app/clients/directory")({ component: ClientsIndexPage });
