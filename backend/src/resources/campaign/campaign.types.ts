import { Campanha } from "@prisma/client";

export type CreateCampaignDto = Pick<
  Campanha,
  "meta" | "prazo" | "titulo" | "descricao" | "previa" | "categoria" | "logoUrl"
>;
export type UpdateCampaignDto = Pick<Campanha, "titulo" | "descricao" | "previa" | "logoUrl">;
export type CampaignDto = Campanha;
