import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userReducer";
import authReducer from "./features/authReducer";
import projectReducer from "./features/projectReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	project: projectReducer,
});


const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	//   devTools: process.env.NODE_ENV !== "production",
});


export { store };


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch