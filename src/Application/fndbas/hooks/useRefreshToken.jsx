import axios from '../api/axios';
import useAuth from './useAuth';

const REFRSH_TOKEN_URL = "v1/FndUser/token/refresh";

export default function useRefreshToken() {
    const {setAuth } = useAuth();
    const token = useAuth();

    const refresh = async () => {
        const response = await axios.get(REFRSH_TOKEN_URL, {
            headers: {
                'Authorization': `Bearer ${token.auth.refreshToken}`
            }
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access_token);

            return { ...prev, accessToken: response.data.access_token }
        });

        return response.data.access_token;
    }
    return refresh;
}
