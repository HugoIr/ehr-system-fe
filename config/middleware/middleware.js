import { useRouter } from "next/router"
import { getUserToken } from "../api/auth"
import ROUTE from "../api/route"

const AuthenticationChecker = ({children}) => {
    return isAuthenticate() ? children : useRouter().push(ROUTE.LOGIN)
}

function isAuthenticate() {
    return (getUserToken() != null)
}

export {AuthenticationChecker, isAuthenticate}