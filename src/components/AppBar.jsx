import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors.appBarBackground,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab name='Repositories' route='/' />
            <AppBarTab name='Sign in' route='/SignIn' />
        </View>
    );
};

export default AppBar;
