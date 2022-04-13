import axios from 'axios'
import qs from 'qs'

import { SERVER_URL } from '../constants'

export const postFormData = async (endpoin: string, data: any) => {
    try {
        const respose = await axios({
            method: "post",
            url: `${SERVER_URL}/${endpoin}`,
            data: qs.stringify(data),
            headers: { "content-Type": "application/x-www-form-urlencoded" },
        })

        return respose.data
    } catch (error) {
        throw error
    }
}