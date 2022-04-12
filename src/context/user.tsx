import React from 'react'
import { Reducer, ReducerAction, ReducerState } from 'react'

import {
    User,
    UserContext as Context,
    UserReducer,
    UserActionType,
} from '../types/auth'

// interface UserI {
//     username: string,
//     token: string
// }

// type User = UserI | null

// enum UserActionType { 'LOGIN' , 'LOGOUT' }
// type Action = { type: UserActionType, payload: User }

const userReducer: UserReducer = (state, action): User => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return {
                ...action.payload!!
            }
        case UserActionType.LOGOUT:
            return null
        default:
            return state
    }
}

// interface UserContextI {
//     user: User,
//     login: (payload: UserI) => void,
//     logout: () => void
// }

// type UserContext = UserContextI | null

const UserContext = React.createContext<Context>(null)

const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [user, dispatch] = React.useReducer<UserReducer>(userReducer, null)

    const login = (payload: User) => {
        dispatch({ type: UserActionType.LOGIN, payload })
        localStorage.setItem('user', JSON.stringify(payload))
    }

    const logout = () => {
        dispatch({ type: UserActionType.LOGOUT, payload: null })
        localStorage.removeItem('user')
    }
    
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext as default, UserProvider }