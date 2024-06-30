import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';
import { ME_QUERY } from '../graphql/queries';
import Text from './Text';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const Separator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { data, loading, error, refetch } = useQuery(ME_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true },
    });

    if (loading) {
        return (<Text>Loading...</Text>);
    }
    if (error) {
        console.error(error);
        return (<Text>{error.toString()}</Text>);
    }

    const reviews = data?.me.reviews.edges.map(({ node }) => node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} showManagementButtons useRepoName refetch={refetch} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={<Separator />}
        />
    );
};

export default MyReviews;
