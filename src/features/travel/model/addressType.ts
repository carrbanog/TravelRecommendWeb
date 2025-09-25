export type AddressType = {
  formatted_address: string;
  geometry: {
    location: coordinates;
  };
};

export type coordinates = {
  lat: number;
  lng: number;
};
