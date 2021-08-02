export interface StarshipResult {
  count: number;
  next: string;
  previous: string;
  results: Starship[];
}

export interface Starship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: number;
  passengers: number;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  created: Date;
  edited: Date;
  url: string;
  pilots: string[];
}
