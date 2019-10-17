import axios from 'axios';
``
export const trackerApi = axios.create(
{
 baseURL: 'http://7b6e7179.ngrok.io'
});

export const signUp = async (email, password) => {
    try
    {
        const response =  await trackerApi.post('/signup', {email, password});
        return ({
            token: response.data.token,
            errorMessage: ''
        });
    } catch(err)
    {
        console.log(err)
        return ({
            token: '',
            errorMessage: 'Error while signing up'
        });
    }
}

export const signInWithBarCode = async (barcode) => {
    try
    {
        const response =  await trackerApi.post('/signinwithbarcode', {barcode});
        return ({
            token: response.data.token,
            userName: response.data.userName,
            errorMessage: ''
        });
    } catch(err)
    {
        console.log(err)
        return ({
            token: '',
            errorMessage: 'Error while signing up'
        });
    }
}