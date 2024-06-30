import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import { REPOSITORY_DETAILS_QUERY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const Separator = () => <View style={styles.separator} />;

const RepositoryDetails = () => {
    const { repoId } = useParams();
    const { data, loading, error } = useQuery(REPOSITORY_DETAILS_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: { id: repoId },
    });

    if (loading) {
        return (<Text>Loading...</Text>);
    }
    if (error) {
        console.error(error);
        return (<Text>{error.toString()}</Text>);
    }

    const repo = data?.repository;
    if (!repo) {
        return (<Text>No such repository exists.</Text>);
    }

    const reviews = data?.repository?.reviews.edges.map(({ node }) => node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => (
                <View>
                    <RepositoryItem repo={repo} showLink />
                    <Separator />
                </View>
            )}
            ItemSeparatorComponent={<Separator />}
        />
    );
};

export default RepositoryDetails;
