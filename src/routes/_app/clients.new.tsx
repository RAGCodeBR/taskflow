import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ImageUp, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/clients/new")({
  component: NewClientPage,
});

function NewClientPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [legalName, setLegalName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [stateRegistration, setStateRegistration] = useState("");
  const [municipalRegistration, setMunicipalRegistration] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [responsible, setResponsible] = useState("");
  const [color, setColor] = useState("#1e3a8a");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);

  const save = async () => {
    const name = tradeName.trim() || legalName.trim();
    if (!name) {
      toast.error("Preencha o Nome fantasia ou a Razão social.");
      return;
    }

    setSaving(true);
    const { data: newClient, error } = await supabase
      .from("clients")
      .insert({
        name,
        cnpj: cnpj || null,
        legal_name: legalName || null,
        trade_name: tradeName || null,
        state_registration: stateRegistration || null,
        municipal_registration: municipalRegistration || null,
        address: address || null,
        phone: phone || null,
        email: email || null,
        responsible: responsible || null,
        color,
        created_by: user?.id,
      })
      .select()
      .single();

    if (error) {
      setSaving(false);
      toast.error(error.message);
      return;
    }

    if (avatarFile && newClient) {
      const extension = avatarFile.name.split(".").pop()?.toLowerCase() || "png";
      const avatarPath = `clients/${newClient.id}/avatar-${Date.now()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("task-attachments")
        .upload(avatarPath, avatarFile, { contentType: avatarFile.type });

      if (uploadError) {
        setSaving(false);
        toast.error(`Cliente cadastrado, mas não foi possível enviar o logo: ${uploadError.message}`);
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        return;
      }

      const { error: avatarError } = await supabase
        .from("clients")
        .update({ avatar_path: avatarPath })
        .eq("id", newClient.id);

      if (avatarError) {
        setSaving(false);
        toast.error(`Cliente cadastrado, mas não foi possível vincular o logo: ${avatarError.message}`);
        queryClient.invalidateQueries({ queryKey: ["clients"] });
        return;
      }
    }

    setSaving(false);
    queryClient.invalidateQueries({ queryKey: ["clients"] });
    toast.success("Cliente cadastrado");
    navigate({ to: "/clients" });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="flex items-center gap-4">
        <Button asChild size="icon" variant="ghost" title="Voltar para clientes">
          <Link to="/clients">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo cliente</h1>
          <p className="text-sm text-muted-foreground">
            Cadastre os dados comerciais e de contato do cliente.
          </p>
        </div>
      </header>

      <Card className="p-6">
        <div className="space-y-6">
          <section className="space-y-3">
            <Field label="Logo do cliente">
              <div className="space-y-2">
                <Label
                  htmlFor="new-client-avatar"
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                    <ImageUp className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium">Enviar logo do cliente</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      PNG, JPG ou WebP
                    </span>
                  </span>
                </Label>
                <Input
                  id="new-client-avatar"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={(event) => setAvatarFile(event.target.files?.[0] ?? null)}
                />
                {avatarFile && avatarPreview && (
                  <div className="flex items-center gap-3 rounded-md border bg-muted/30 p-2">
                    <img
                      src={avatarPreview}
                      alt="Prévia do logo selecionado"
                      className="block h-14 w-14 shrink-0 rounded border bg-muted object-contain p-0.5"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Imagem selecionada</p>
                      <p className="truncate text-sm font-medium" title={avatarFile.name}>
                        {avatarFile.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Field>
            <h2 className="font-semibold">Dados cadastrais</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CNPJ">
                <Input value={cnpj} onChange={(event) => setCnpj(event.target.value)} />
              </Field>
              <Field label="Nome fantasia">
                <Input value={tradeName} onChange={(event) => setTradeName(event.target.value)} />
              </Field>
              <Field label="Razão social">
                <Input value={legalName} onChange={(event) => setLegalName(event.target.value)} />
              </Field>
              <Field label="Responsável">
                <Input
                  value={responsible}
                  onChange={(event) => setResponsible(event.target.value)}
                />
              </Field>
              <Field label="Inscrição Estadual">
                <Input
                  value={stateRegistration}
                  onChange={(event) => setStateRegistration(event.target.value)}
                />
              </Field>
              <Field label="Inscrição Municipal">
                <Input
                  value={municipalRegistration}
                  onChange={(event) => setMunicipalRegistration(event.target.value)}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-3 border-t pt-6">
            <h2 className="font-semibold">Contato</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telefone">
                <Input value={phone} onChange={(event) => setPhone(event.target.value)} />
              </Field>
              <Field label="E-mail">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Field>
            </div>
            <Field label="Endereço completo">
              <Input value={address} onChange={(event) => setAddress(event.target.value)} />
            </Field>
          </section>

          <div className="border-t pt-5">
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5">
              <Label className="text-sm font-medium">Cor de identificação</Label>
              <input
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                className="h-9 w-9 cursor-pointer appearance-none rounded-full border-0 bg-transparent p-0 shadow-sm ring-1 ring-border transition hover:ring-2 hover:ring-primary/50 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-0 [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button asChild variant="outline">
              <Link to="/clients">Cancelar</Link>
            </Button>
            <Button onClick={save} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Salvando..." : "Salvar cliente"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
