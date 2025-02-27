import axios from 'axios';

import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL;

// export const getAllBooks = createAppAsyncThunk(
//   "books/getAllBooks",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/book`);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const getBookById = createAppAsyncThunk(
//   "books/getBookById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/book/${id}`);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const setAuthHeader = (token: any) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// // const token = localStorage.getItem("accessToken")

// let token;
// if (typeof window !== "undefined") {
//   token = localStorage.getItem("accessToken");
// }

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

interface AddToFavoriteRequest {
  bookId: string; // Assuming the bookId is of type string
}

export const AddToFavorite = createAppAsyncThunk<string, AddToFavoriteRequest>(
  'books/favorites/add',
  async (credentials: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/favorite`,
        credentials
        // config
      );
      // setAuthHeader(response.data.token);
      // При билде не нашло ети два имени, сорри что закоментил
      return response.data.bookId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const GetFromFavorite = createAppAsyncThunk(
  'books/getFromFavotive',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/favorite`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const RemoveFromFavorite = createAppAsyncThunk(
  'books/removeFromFavotive',
  async (credentials: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/user/favorite/${credentials}`
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
