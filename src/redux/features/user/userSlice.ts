import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface IUser {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isError: boolean;
}

interface ICradintial {
  email: string;
  password: string;
}

const initialState: IUser = {
  user: {
    email: null,
  },
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
};

export const createUser = createAsyncThunk(
  'user/create-user',
  async ({ email, password }: ICradintial) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: ICradintial) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, actions) => {
        state.user.email = actions.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createUser.rejected, (state, actions) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = actions.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, actions) => {
        state.user.email = actions.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, actions) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = actions.error.message!;
      });
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
// export const {  } = userSlice.actions;
export default userSlice.reducer;
