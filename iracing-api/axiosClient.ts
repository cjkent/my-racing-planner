import { default as axios } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import { FileCookieStore } from "tough-cookie-file-store";

export const jar = new CookieJar(new FileCookieStore("./cookie-jar.txt"));
const axiosClient = wrapper(
  axios.create({
    baseURL: "https://members-ng.iracing.com",
    jar,
  }),
);

export default axiosClient;
