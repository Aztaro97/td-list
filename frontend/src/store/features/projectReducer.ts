import { ITodo } from "@/@types";
import { axiosPrivate } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface projectsProps {
	isLoading: boolean;
	isCreating: boolean;
	isUpdating: boolean;
	isDeleting: boolean;
	error: any;
	data: any[];
}

const initialState: projectsProps = {
	isLoading: false,
	isCreating: false,
	isUpdating: false,
	isDeleting: false,
	error: null,
	data: [],
};

export const getAllProject = createAsyncThunk("auth/get_all_project", async (_, thunkApi) => {
	try {
		const result = await axiosPrivate.get("/projects/all");
		return result.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

// Create a function that will detele a projet
export const deleteProject = createAsyncThunk("auth/delete_project", async (projectId: string, thunkApi) => {
	try {
		const result = await axiosPrivate.delete(`/projects/${projectId}`);
		return result.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

// Update the project 
export const updateProject = createAsyncThunk("auth/updated", async (data: ITodo, thunkApi) => {
	try {
		const result = await axiosPrivate.put(`/projects/${data._id}`, data);
		return result.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

// Create Project
export const createProject = createAsyncThunk("auth/create_project", async (data, thunkApi) => {
	try {
		const result = await axiosPrivate.post("/projects/create", data);
		return result.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});

// Updated the Status
export const updateStatus = createAsyncThunk("auth/update_status", async (data: ITodo, thunkApi) => {
	try {
		const result = await axiosPrivate.put(`/projects/status/${data._id}`);
		return result.data;
	} catch (error) {
		return thunkApi.rejectWithValue(error);
	}
});


const projectSlide = createSlice({
	name: "Project",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllProject.pending, (state) => {
			return {
				...state,
				isLoading: true,
				error: null,
			};
		});
		builder.addCase(getAllProject.fulfilled, (state, action) => {
			return {
				...state,
				data: action.payload,
				isLoading: false,
			};
		});
		builder.addCase(getAllProject.rejected, (state, action) => {
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		});

		// Delete Project
		builder.addCase(deleteProject.pending, (state) => {
			return {
				...state,
				isDeleting: true,
				error: null,
			};
		}
		);
		builder.addCase(deleteProject.fulfilled, (state, action) => {
			const todoId = action.payload._id as string;
			return {
				...state,
				isDeleting: false,
				// Delete the item from the state data
				data: [state.data.filter((item) => item._id !== todoId.toString())],
			};
		}
		);
		builder.addCase(deleteProject.rejected, (state, action) => {
			return {
				...state,
				isDeleting: false,
				error: action.payload,
			};
		});

		// Update Project
		builder.addCase(updateProject.pending, (state) => {
			return {
				...state,
				isUpdating: true,
				error: null,
			};
		}
		);
		builder.addCase(updateProject.fulfilled, (state, action) => {
			return {
				...state,
				data: state.data.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				}),
				isUpdating: false,
			};
		}
		);
		builder.addCase(updateProject.rejected, (state, action) => {
			return {
				...state,
				isUpdating: false,
				error: action.payload,
			};
		}
		);

		// Create Project
		builder.addCase(createProject.pending, (state) => {
			return {
				...state,
				isCreating: true,
				error: null,
			};
		}
		);
		builder.addCase(createProject.fulfilled, (state, action) => {
			return {
				...state,
				data: [...state.data, action.payload],
				isCreating: false,
			};
		}
		);
		builder.addCase(createProject.rejected, (state, action) => {
			return {
				...state,
				isCreating: false,
				error: action.payload,
			};
		}
		);

		// Updated the Status
		builder.addCase(updateStatus.pending, (state) => {
			return {
				...state,
				isUpdating: true,
				error: null,
			};
		}
		);
		builder.addCase(updateStatus.fulfilled, (state, action) => {
			return {
				...state,
				data: state.data.map((item) => {
					if (item._id === action.payload._id) {
						return action.payload;
					}
					return item;
				}),
				isUpdating: false,
			};
		}
		);
		builder.addCase(updateStatus.rejected, (state, action) => {
			return {
				...state,
				isUpdating: false,
				error: action.payload,
			};
		}
		);
	}
});

export default projectSlide.reducer;