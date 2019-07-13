import axios from "axios"
import { Movie } from "./shared-types"

const baseURL = "https://spreadsheets.google.com/feeds/list/1sRaboEbc6Gw2T7cGglZkv0iTNkfKGNXmwJ4PB1r_jfk/od6/public/values?alt=json";

export const getMovies = () => axios.get<Movie[]>(baseURL);