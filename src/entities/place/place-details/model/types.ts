export interface PlaceDetailResponse {
  name: string;
  editorial_summary?: {
    overview?: string;
  };
  photos?: {
    photo_reference: string;
  }[];
  rating?: number;
  vicinity?: string;
}