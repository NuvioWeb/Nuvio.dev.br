import { createLeadResponseSchema, type CreateLeadInput } from "@nuvio/contracts";
import { getApiBaseUrl } from "./env";

export async function submitLead(payload: CreateLeadInput) {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "message" in data &&
      (typeof (data as { message: unknown }).message === "string" ||
        Array.isArray((data as { message: unknown }).message))
        ? (data as { message: string | string[] }).message
        : "Não foi possível enviar. Tente novamente em instantes.";
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return createLeadResponseSchema.parse(data);
}
