import React from 'react'
import { Reducer, ReducerAction, ReducerState } from 'react'

import {
    User,
    UserContextI,
    UserReducer,
    UserActionType,
} from '../types/auth'

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

const initialState: UserContextI = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!!) : null,
    login: (payload: User) => {},
    logout: () => {}
}

const UserContext = React.createContext<UserContextI>(initialState)

const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [user, dispatch] = React.useReducer<UserReducer>(userReducer, null)

    const login = (payload: User) => {
        dispatch({ type: UserActionType.LOGIN, payload })
        localStorage.setItem('user', JSON.stringify(payload))

        location.href = '/'
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