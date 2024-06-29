import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import RepositoryDetails from './RepositoryDetails';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackground,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/CreateReview" element={<CreateReview />} />
                <Route path="/Repo">
                    <Route path=":repoId" element={<RepositoryDetails />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;
