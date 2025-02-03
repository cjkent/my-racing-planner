import Base64 from "crypto-js/enc-base64";
import sha256 from "crypto-js/sha256";
import axiosClient, { jar } from "./axiosClient";

export const authenticate = async (
  email: string,
  password: string,
  reuseCookie: boolean = true,
) => {
  if (reuseCookie) {
    const cookies = await jar.getCookies("https://members-ng.iracing.com");
    const authCookie = cookies.find(
      (cookie: { key: string }) => cookie.key === "authtoken_members",
    );

    if (authCookie && authCookie.TTL() > 0) {
      return Promise.resolve();
    }
  }

  return axiosClient.post("/auth", {
    email,
    password: Base64.stringify(sha256(password + email.toLowerCase())),
  });
};

const apiGet = async (
  path: string,
  queryParams: { [key: string]: string } = {},
) => {
  const params = new URLSearchParams(queryParams).toString();
  const url = params ? `${path}?${params}` : path;
  const response = await axiosClient.get(url);
  return axiosClient.get(response.data.link);
};

export const apiGetCars = async () => {
  return apiGet("/data/car/get");
};

export const apiGetCarAssets = async () => {
  return apiGet("/data/car/assets");
};

export const apiGetTracks = async () => {
  return apiGet("/data/track/get");
};

export const apiGetTrackAssets = async () => {
  return apiGet("/data/track/assets");
};

export const apiGetCarClasses = async () => {
  return apiGet("/data/carclass/get");
};

export const apiGetLicenses = async () => {
  return apiGet("/data/lookup/licenses");
};

// export const apiGetSeasons = async (
//   season_year: string,
//   season_quarter: string,
// ) => {
//   return apiGet("/data/season/list", { season_year, season_quarter });
// };

// export const apiGetSeries = async () => {
//   return apiGet("/data/series/get");
// };

export const apiGetSeriesAssets = async () => {
  return apiGet("/data/series/assets");
};

export const apiGetSeriesSeasons = async () => {
  return apiGet("/data/series/seasons");
};

export const apiGetSeriesPastSeasons = async (series_id: string) => {
  return apiGet("/data/series/past_seasons", { series_id });
};

export const apiGetTest = async () => {
  return apiGet("/data/series/past_seasons", {
    series_id: "572",
  });
};
