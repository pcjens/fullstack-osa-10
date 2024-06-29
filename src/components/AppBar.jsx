import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthStorage from '../hooks/useAuthStorage';
import { ME_QUERY } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors.appBarBackground,
    },
});

const AppBar = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const meQuery = useQuery(ME_QUERY);
    const navigate = useNavigate();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
        navigate('/');
    };

    const signedIn = meQuery.data?.me != null;

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab name='Repositories' route='/' />
                {signedIn && (<AppBarTab name='Create a review' route='/CreateReview' />)}
                {signedIn
                    ? (<AppBarTab name='Sign out' onPress={async () => await signOut()} />)
                    : (<AppBarTab name='Sign in' route='/SignIn' />)}
                {signedIn || (<AppBarTab name='Sign up' route='/SignUp' />)}
                </ScrollView>
        </View>
    );
};

export default AppBar;
