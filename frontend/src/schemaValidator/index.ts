import z from "zod"

export const createTodoSchema = z.object({
	title: z.string({
		required_error: "The title is required"
	}),
	description: z.string({
		required_error: "The description is required"
	}),
})

export const todoSchema = z.object({
	title: z.string({
		required_error: "The title is required"
	}),
	description: z.string({
		required_error: "The description is required"
	}),
	isDone: z.boolean().optional()
})


export const loginSchema = z.object({
	email: z.string({
		required_error: "The email is required"
	}),
	password: z.string({
		required_error: "The password is required"
	}),
})

export const registerSchema = z.object({
	name: z.string({
		required_error: "The full name is required"
	}),
	email: z.string({
		required_error: "The email is required"
	}),
	password: z.string({
		required_error: "The password is required"
	}),
})
