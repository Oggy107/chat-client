import React from 'react'

import { AuthPageType } from '../../types/auth'
import Login from './Login'
import Signup from './Signup'

const Auth = () => {
    const [page, setPage] = React.useState<AuthPageType>(AuthPageType.LOGIN)

    return (
        <>
            {page === AuthPageType.LOGIN ?
                <Login setPage={setPage} /> :
                <Signup setPage={setPage} />
            }
        </>
    )
}

export default Auth