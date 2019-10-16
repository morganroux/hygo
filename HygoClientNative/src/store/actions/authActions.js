export const toggleToken = () => {
    return ({
        type:  'TOGGLE_TOKEN'
    });
}

export const updateToken = (token) => {
    return ({
        type: 'UPDATE_TOKEN',
        token
    });
}