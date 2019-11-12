export interface Property {
  id: string;
  imageURI?: string;
  address?: string;
  coordinates?: Coordinates;
  estimatedValue?: string;
  hasNotes?: boolean;
}

export interface Member {
  id: string;
  image: string;
}

export interface Coordinates {
  lng: number;
  lat: number;
}
