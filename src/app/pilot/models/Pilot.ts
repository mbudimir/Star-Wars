export interface PilotResult {
  count: number;
  next: string;
  previous: string;
  results: Pilot[];
}

export interface Pilot {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}
