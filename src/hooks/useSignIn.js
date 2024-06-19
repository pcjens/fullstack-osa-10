import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE_MUTATION } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [authenticate, result] = useMutation(AUTHENTICATE_MUTATION);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        const result = await authenticate({ variables: { username, password } });
        await authStorage.setAccessToken(result.data.authenticate.accessToken);
        apolloClient.resetStore();
        return result;
    };

    return [signIn, result];
};

export default useSignIn;
