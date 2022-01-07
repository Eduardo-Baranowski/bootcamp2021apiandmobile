export interface CarDTO {
  id: string;
  brand: string;  
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  acessories: {
    id: string;
    type: string;
    name: string;
  }[];
  photos: {
    id: string;
    photo: string;
  }[];
}
