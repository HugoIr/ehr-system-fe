const getUserToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('TOKEN');
    }
    return "";
}

const setUserToken = (token) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('TOKEN', token);
    }
}

const deleteUserToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('TOKEN');
    }
}


const setOrganization = (token) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('ORGANIZATION', token);
    }
}

const deleteOrganization = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem('ORGANIZATION');
    }
}

const getOrganization = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('ORGANIZATION');
    }
    return "";
}

export { getUserToken, setUserToken, deleteUserToken, getOrganization, setOrganization, deleteOrganization }