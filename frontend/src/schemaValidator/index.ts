import z from "zod"

export const todoSchema = z.object({
	title: z.string(),
	description: z.string(),
	isDone: z.boolean().optional()
})

export const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
})

export const registerSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
})
