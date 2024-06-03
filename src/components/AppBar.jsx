import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ScrollView } from 'react-native';

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
            <ScrollView horizontal>
                <AppBarTab name='Repositories' route='/' />
                <AppBarTab name='Sign in' route='/SignIn' />
            </ScrollView>
        </View>
    );
};

export default AppBar;
