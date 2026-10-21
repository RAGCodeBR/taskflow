import { useState, type SVGProps } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { WHATSAPP_SECTIONS } from "@/lib/whatsapp-local-sections";

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01C18.62 23.83 24 18.48 24 11.9c0-3.18-1.24-6.18-3.48-8.42ZM12.04 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.01c0 5.47-4.46 9.92-9.94 9.92Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.11.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>;
}

export function WhatsAppNavGroup({ expanded, active, onNavigate }: {
  expanded: boolean; active: boolean; onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = useRouterState({ select: state => (state.location.search as { section?: string }).section ?? "chat" });
  const links = <div className="space-y-0.5" aria-label="Configurações do WhatsApp">
    {WHATSAPP_SECTIONS.map((section, index) => <div key={section.key}>
      {(index === 0 || WHATSAPP_SECTIONS[index - 1].group !== section.group) &&
        <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{section.group}</p>}
      <Link to="/whatsapp" search={{ section: section.key }}
        onClick={() => { if (!expanded) setOpen(false); onNavigate?.(); }}
        aria-current={active && selected === section.key ? "page" : undefined}
        className={`block rounded-lg px-3 py-2 text-xs transition hover:bg-sidebar-accent/10 ${active && selected === section.key ? "bg-sidebar-primary/10 font-semibold text-sidebar-primary" : "text-sidebar-foreground/80"}`}>
        {section.label}
      </Link>
    </div>)}
  </div>;
  if (!expanded) return <DropdownMenu open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild><button title="WhatsApp" aria-label="Abrir menu do WhatsApp"
      className={`mx-auto grid h-10 w-10 place-items-center rounded-full transition hover:bg-emerald-500/10 ${active ? "bg-sidebar-primary/10 text-sidebar-primary" : "text-sidebar-foreground/80"}`}>
      <WhatsAppIcon className="h-5 w-5" />
    </button></DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start" className="max-h-[75dvh] w-64 overflow-y-auto bg-sidebar p-2 text-sidebar-foreground">
      <p className="flex items-center gap-2 px-3 py-2 text-sm font-semibold"><WhatsAppIcon className="h-4 w-4 text-emerald-600" />WhatsApp</p>{links}
    </DropdownMenuContent>
  </DropdownMenu>;
  return <Collapsible open={open} onOpenChange={setOpen}>
    <div className={`flex items-center rounded-full ${active ? "bg-sidebar-primary/10" : "hover:bg-sidebar-accent/10"}`}>
      <Link to="/whatsapp" search={{ section: "chat" }} onClick={onNavigate}
        className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2 text-sm font-medium">
        <span className="grid h-7 w-7 shrink-0 place-items-center"><WhatsAppIcon className="h-5 w-5 text-emerald-600" /></span>WhatsApp
      </Link>
      <CollapsibleTrigger asChild><button className="mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-sidebar-accent/15"
        aria-label={open ? "Recolher configurações do WhatsApp" : "Expandir configurações do WhatsApp"}>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button></CollapsibleTrigger>
    </div>
    <CollapsibleContent className="ml-5 border-l border-sidebar-primary/20 pb-2 pl-2">{links}</CollapsibleContent>
  </Collapsible>;
}
