import { getCookie } from "cookies-next"
import { JwtPayload, jwtDecode } from "jwt-decode";

export function decodeToken(token?: string) {
    const temp = getCookie("access")

    const token1 = token ? token : temp

    try {
        const decodedToken = jwtDecode<JwtPayload>(token1 as string)

        return decodedToken
    } catch (error) {
        return null
    }

}

export function checkTokenIsExpires(token?: string) {
    const clientSideToken = getCookie("access")

    const serverSideToken = token

    const shouldCheckToken = token ? serverSideToken : clientSideToken

    const decodedToken = decodeToken(shouldCheckToken)

    const contition = decodedToken && (decodedToken?.exp as number)  * 1000 > Date.now()

    return contition
}