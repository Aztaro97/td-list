import { TUser } from "@/@types";
import { axiosPrivate } from "@/api";
import { TLogin } from "@/screens/loginScreen";
import { TRegister } from "@/screens/registerScreen";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authProps {
	isLoading: boolean;
	userInfo: null | TUser;
	error: any;
	isAuthenticated: boolean;
	token: string | null
}

const initialState: authProps = {
	isLoading: false,
	userInfo: null,
	error: null,
	isAuthenticated: false,
	token: null
};

export const login = createAsyncThunk("auth/sign_it", async (body: TLogin, thunkApi) => {
	try {
		const result = await axiosPrivate.post("/users/login", body);
		return result.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

export const createUser = createAsyncThunk(
	"auth/create_user",
	async (body: TRegister, { getState, rejectWithValue }) => {
		try {
			const result = await axiosPrivate.post("/users/register", body);
			return result.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);


export const getRefreshToken = createAsyncThunk(
	"auth/refreshToken",
	async (data, thunkApi) => {
		try {
			const result = await axiosPrivate.get("/auth/token", {
				withCredentials: true,
			});
			return result.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error);
		}
	}
);

const userSlide = createSlice({
	name: "Auth",
	initialState,
	reducers: {
		logOut: (state) => {
			return {
				...state,
				isAuthenticated: false,
				userInfo: null,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		});
		builder.addCase(login.fulfilled, (state, action) => {
			return {
				...state,
				userInfo: {
					...action.payload,
				},
				token: action.payload.token,
				isLoading: false,
				isAuthenticated: true,
			};
		});
		builder.addCase(login.rejected, (state, action) => {
			return {
				...state,
				isLoading: false,
				userInfo: null,
				error: action.payload,
				isAuthenticated: false,
			};
		});

		// Register
		builder.addCase(createUser.pending, (state, action) => {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		});
		builder.addCase(createUser.fulfilled, (state, action) => {
			return {
				...state,
				userInfo: {
					...action.payload,
				},
				token: action.payload.token,
				isLoading: false,
				isAuthenticated: true,
			};
		});
		builder.addCase(createUser.rejected, (state, action) => {
			return {
				...state,
				isLoading: true,
				error: action.payload,
			};
		});
	}
});

export const { logOut } = userSlide.actions;

export default userSlide.reducer;