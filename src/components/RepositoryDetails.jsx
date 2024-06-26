import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import { REPOSITORY_DETAILS_QUERY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
    reviewCard: {
        marginTop: 12,
        padding: 16,
        backgroundColor: theme.colors.contentBackground,
        display: 'flex',
        flexDirection: 'row',
    },
    reviewScore: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center',
        marginRight: 16,
    },
    reviewScoreText: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
        textAlign: 'center',
    },
    reviewMain: {
        flexShrink: 1,
    }
});

const ReviewItem = ({ review }) => {
    const localizedReviewDate = new Date(review.createdAt).toLocaleDateString();

    return (
        <View style={styles.reviewCard}>
            <View style={styles.reviewScore}>
                <Text style={styles.reviewScoreText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewMain}>
                <Text fontSize='subheading' fontWeight='bold'>{review.user.username}</Text>
                <Text color='textSecondary'>{localizedReviewDate}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    );
}

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
    const reviews = data?.repository.reviews.edges.map(({ node }) => node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem repo={repo} showLink />}
        />
    );
};

export default RepositoryDetails;
