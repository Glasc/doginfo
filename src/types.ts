import z from "zod";

export type Breed = {
  weight: { imperial: string; metric: string };
  height: { imperial: string; metric: string };
  id: number;
  name: string;
  bred_for: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
  image: { id: string; width: number; height: number; url: string };
};

export const BreedParser = z.object({
  weight: z.object({
    imperial: z.string(),
    metric: z.string(),
  }),
  height: z.object({
    imperial: z.string(),
    metric: z.string(),
  }),
  id: z.number(),
  name: z.string(),
  bred_for: z.string(),
  life_span: z.string(),
  temperament: z.string(),
  reference_image_id: z.string(),
  image: z.object({
    id: z.string(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }),
});
