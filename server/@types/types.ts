export interface IUser {
	_id: string
	name: string
	email: string
	token?: string
	isAdmin?: boolean
	matchPassword: ((
		password: string,
	) => Promise<boolean> | boolean)

}