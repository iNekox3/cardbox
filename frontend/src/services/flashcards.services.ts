import axios from "axios";
import { IFlashCard } from "../components/HomePage";

// TODO: Check if each element in returned data is of type IFlashCard
// TODO: Do proper error handling
export const getFlashCards: () => Promise<IFlashCard[]> = async () => {
  try {
    const api = process.env.REACT_APP_API_ENDPOINT;
    const routeDetails = `/getFlashcards/${process.env.REACT_APP_TEST_USER}`;
    const response = await axios.get(`${api}${routeDetails}`);
    return response.data.flashcards || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
