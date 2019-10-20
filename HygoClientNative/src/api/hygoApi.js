import axios from 'axios';

export const trackerApi = axios.create(
{
 baseURL: 'http://e32961a8.ngrok.io'
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
        return ({
            token: '',
            errorMessage: 'Error while signing up'
        });
    }
}

export const checkToken = async (token) => {
    if (!token) {
        return ({
            errorMessage: 'No Token',
            userName: ''
        });
    }
    else {
        try{
            const response = await trackerApi.post('/checkToken', {token});
            return ({
                errorMessage: '',
                userName: response.data.userName
            });
        }
        catch(err) {
            return ({
                errorMessage: 'Invalide stored token',
                userName: ''
            });
        }
    }
}

export const getValue = async(token, valueType) => {
    if(token) {
        try {
            const response  = await trackerApi.post('/getValue', {token, valueType});
            const {value} = response.data;
            return ({
                value
            });

        } catch(error) {
            return ({
                value: ''
            });
        }
    }
}