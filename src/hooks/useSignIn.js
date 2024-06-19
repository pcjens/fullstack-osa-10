import { useMutation } from '@apollo/client';
import { AUTHENTICATE_MUTATION } from '../graphql/mutations';

const useSignIn = () => {
    const [authenticate, result] = useMutation(AUTHENTICATE_MUTATION);

    const signIn = async ({ username, password }) => {
        await authenticate({ variables: { username, password } });
        return result;
    };

    return [signIn, result];
};

export default useSignIn;
