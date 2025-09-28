import axios from "axios";
import React from "react";
import type { AddressType } from "../model/addressType";


// 도시이름, 좌표 반환
export const fetchMapCode = async (
  address: string
): Promise<AddressType | undefined> => {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: import.meta.env.VITE_GOOGLE_MAP,
        },
      }
    );
    console.log(res.data.results[0]);
    return res.data.results[0];
    // if(res.data.)
  } catch (err) {
    console.error(err);
  }
};
