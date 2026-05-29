import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Votre nom est requis."),
  email: z.string().email("Adresse email invalide."),
  company: z.string().optional(),
  budget: z.enum(["< 2k€", "2–5k€", "5–10k€", "> 10k€", "À définir"]),
  message: z.string().min(20, "Décrivez votre besoin (20 caractères min)."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const BUDGET_OPTIONS: ContactInput["budget"][] = [
  "< 2k€",
  "2–5k€",
  "5–10k€",
  "> 10k€",
  "À définir",
];
