import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepositoryDetails from '../hooks/useRepositoryDetails';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const Separator = () => <View style={styles.separator} />;

const RepositoryDetails = () => {
    const { repoId } = useParams();
    const { repository, loading, error, fetchMore } = useRepositoryDetails({ id: repoId, first: 4 });

    if (loading) {
        return (<Text>Loading...</Text>);
    }
    if (error) {
        console.error(error);
        return (<Text>{error.toString()}</Text>);
    }

    if (!repository) {
        return (<Text>No such repository exists.</Text>);
    }

    const reviews = repository.reviews.edges.map(({ node }) => node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <View>
                    <RepositoryItem repo={repository} showLink />
                    <Separator />
                </View>
            )}
            ItemSeparatorComponent={<Separator />}
            onEndReached={fetchMore}
        />
    );
};

export default RepositoryDetails;
