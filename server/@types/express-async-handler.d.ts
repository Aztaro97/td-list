import { IUser } from "./types";

// extends express-async-handler with user type
declare module 'express-async-handler' {
	export interface Request {
		user?: any
		body?: any
	}
}
