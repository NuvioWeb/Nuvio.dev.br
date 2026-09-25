import { zodResolver } from "@hookform/resolvers/zod";
import { createLeadSchema, type CreateLeadInput, leadSegmentSchema } from "@nuvio/contracts";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { submitLead } from "~/lib/api-client";

const segments = leadSegmentSchema.options;

export function ContactForm() {
  const form = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      whatsapp: "",
      segment: "outro",
      objective: "",
      message: "",
      conversionOrigin: "contato",
      consent: undefined,
      website: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitLead,
    onSuccess: () => {
      toast.success("Pedido enviado. Em breve entraremos em contato.");
      form.reset({
        name: "",
        businessName: "",
        email: "",
        whatsapp: "",
        segment: "outro",
        objective: "",
        message: "",
        conversionOrigin: "contato",
        consent: undefined,
        website: "",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Falha no envio");
    },
  });

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Seu nome"
          error={form.formState.errors.name?.message}
        >
          <Input id="name" autoComplete="name" {...form.register("name")} />
        </Field>
        <Field
          id="businessName"
          label="Nome do negócio"
          error={form.formState.errors.businessName?.message}
        >
          <Input id="businessName" {...form.register("businessName")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="email"
          label="E-mail"
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
        </Field>
        <Field
          id="whatsapp"
          label="WhatsApp (opcional)"
          error={form.formState.errors.whatsapp?.message}
        >
          <Input id="whatsapp" autoComplete="tel" {...form.register("whatsapp")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="segment"
          label="Segmento"
          error={form.formState.errors.segment?.message}
        >
          <select
            id="segment"
            className="flex h-11 w-full rounded-xl border border-input bg-card px-3 text-sm"
            {...form.register("segment")}
          >
            {segments.map((segment) => (
              <option key={segment} value={segment}>
                {segment}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="objective"
          label="Objetivo"
          error={form.formState.errors.objective?.message}
        >
          <Input
            id="objective"
            placeholder="Ex.: novo site institucional"
            {...form.register("objective")}
          />
        </Field>
      </div>

      <Field
        id="message"
        label="Mensagem"
        error={form.formState.errors.message?.message}
      >
        <Textarea id="message" {...form.register("message")} />
      </Field>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...form.register("website")}
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={form.watch("consent") === true}
          onCheckedChange={(checked) =>
            form.setValue("consent", checked === true ? true : (undefined as unknown as true), {
              shouldValidate: true,
            })
          }
        />
        <div>
          <Label htmlFor="consent" className="leading-relaxed">
            Concordo com o tratamento dos dados para retorno do orçamento, conforme a{" "}
            <a href="/politica-de-privacidade" className="underline">
              política de privacidade
            </a>
            .
          </Label>
          {form.formState.errors.consent ? (
            <p className="mt-1 text-sm text-destructive" role="alert">
              {form.formState.errors.consent.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={mutation.isPending}>
        {mutation.isPending ? "Enviando..." : "Enviar pedido de orçamento"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
