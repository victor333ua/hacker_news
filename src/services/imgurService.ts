const isTokenExpired = () => {
    const delta =  Number(process.env.IMGUR_GET_TOKEN_DATA) + 
                Number(process.env.IMGUR_EXPIRES_IN)*1000 - Date.now();
    return delta < 0 ? true : false;
};


const generateAccessToken = async (options: {
    refresh_token: string, client_id: string, client_secret: string 
}) => {
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("refresh_token", options.refresh_token);
    formdata.append("client_id", options.client_id);
    formdata.append("client_secret", options.client_secret);
    formdata.append("grant_type", "refresh_token");

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata
    };

    const response = await fetch(
        "https://api.imgur.com/oauth2/token", requestOptions);
    if (!response.ok) throw Error('error receiving new token');
    const { access_token, refresh_token } = await response.json();
    return  { access_token, refresh_token };   
};

export const getImgurData = async () => {
    const str = process.env.IMGUR_IS_AUTHED;
    const isAuthed = str === 'false' ? false : true;
    const client_id = process.env.IMGUR_CLIENT_ID as string;
    const client_secret = process.env.IMGUR_CLIENT_ID as string;
    let access_token = process.env.IMGUR_ACCESS_TOKEN as string;
    let refresh_token = process.env.IMGUR_REFRESH_TOKEN as string;

    if (isAuthed && isTokenExpired()) {
        ({ access_token, refresh_token } = await generateAccessToken({
            client_id, client_secret, refresh_token
        }));
// save new values here       
// ******
    }

    return {
        isAuthed, clientId: client_id, accessToken: access_token
    };
}