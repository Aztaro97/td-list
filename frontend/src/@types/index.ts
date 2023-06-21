export interface ITodo {
	_id: string;
	title: string;
	description: string;
	isDone: boolean;
}

export interface TUser {
	_id?: string;
	name: string;
	email: string;
	password?: boolean;
	token?: string
}