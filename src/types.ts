import z from "zod";

export interface RootObject {
  bred_for?: string;
  breed_group?: BreedGroup;
  country_code?: CountryCode;
  description?: string;
  height: Eight;
  history?: string;
  id: number;
  image: Image;
  life_span: string;
  name: string;
  origin?: string;
  reference_image_id: string;
  temperament?: string;
  weight: Eight;
}

export enum BreedGroup {
  Empty = "",
  Herding = "Herding",
  Hound = "Hound",
  Mixed = "Mixed",
  NonSporting = "Non-Sporting",
  Sporting = "Sporting",
  Terrier = "Terrier",
  Toy = "Toy",
  Working = "Working",
}

export enum CountryCode {
  Ag = "AG",
  Au = "AU",
  Us = "US",
}

export interface Eight {
  imperial: string;
  metric: string;
}

export interface Image {
  height: number;
  id: string;
  url: string;
  width: number;
}

export type Breed = RootObject;

export const breedSchema = z.object({
  bred_for: z.string().optional(),
  breed_group: z
    .enum([
      BreedGroup.Empty,
      BreedGroup.Herding,
      BreedGroup.Hound,
      BreedGroup.Mixed,
      BreedGroup.NonSporting,
      BreedGroup.Sporting,
      BreedGroup.Terrier,
      BreedGroup.Toy,
      BreedGroup.Working,
    ])
    .optional(),
  country_code: z
    .enum([CountryCode.Ag, CountryCode.Au, CountryCode.Us])
    .optional(),
  description: z.string().optional(),
  height: z.object({
    imperial: z.string(),
    metric: z.string(),
  }),
  history: z.string().optional(),
  id: z.number(),
  image: z.object({
    height: z.number(),
    id: z.string(),
    url: z.string(),
    width: z.number(),
  }),
  life_span: z.string(),
  name: z.string(),
  origin: z.string().optional(),
  reference_image_id: z.string(),
  temperament: z.string().optional(),
  weight: z.object({
    imperial: z.string(),
    metric: z.string(),
  }),
});
