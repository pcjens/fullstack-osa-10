import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        backgroundColor: theme.colors.appBarBackground,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab name='Repositories' />
        </View>
    );
};

export default AppBar;
