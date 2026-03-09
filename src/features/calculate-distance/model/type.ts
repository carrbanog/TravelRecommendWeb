export type distanceResponse = {
  distances: {
    fromIndex: number;
    toIndex: number;
    distanceText: string;
    durationText: string;
    mode: string;
    steps: {
      mode: string;
      instruction: string;
      duration: string;
    }[];
  }[];
};
