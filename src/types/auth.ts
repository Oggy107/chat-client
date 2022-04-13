import { Reducer } from 'react'

interface UserI {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    token: string;
}

export type User = UserI | null

export interface UserContextI {
    user: User,
    login: (payload: UserI) => void,
    logout: () => void
}

// export type UserContext = UserContextI | null

export enum UserActionType { 'LOGIN' , 'LOGOUT' }
export type UserAction = { type: UserActionType, payload: User }

export type UserReducer = Reducer<User, UserAction>

// AUTH PAGE
export enum AuthPageType { 'LOGIN', 'SIGNUP' }
export interface AuthPageProps {
    setPage: (page: AuthPageType) => void
}