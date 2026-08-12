/**
 * All 16 official barangays of Marikina City
 * Source: Marikina City government official records
 */
export const MARIKINA_BARANGAYS = [
  "Barangka",
  "Calumpang",
  "Concepcion Dos",
  "Concepcion Uno",
  "Fortune",
  "Industrial Valley",
  "Jesus dela Peña",
  "Kalumpang",
  "Malanday",
  "Marikina Heights",
  "Nangka",
  "Parang",
  "San Roque",
  "Sta. Elena",
  "Tañong",
  "Tumana",
] as const;

export type MarikinaBrgy = (typeof MARIKINA_BARANGAYS)[number];
