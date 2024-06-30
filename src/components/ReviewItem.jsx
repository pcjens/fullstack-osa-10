import { View, Pressable, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW_MUTATION } from '../graphql/mutations';

const styles = StyleSheet.create({
    reviewCardContainer: {
        padding: 16,
        backgroundColor: theme.colors.contentBackground,
    },
    reviewCard: {
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
    },
    managementButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 16,
        marginTop: 16,
    },
    managementButton: {
        backgroundColor: theme.colors.primary,
        flexGrow: 1,
        padding: 12,
        borderRadius: 4,
    },
    managementButtonScary: {
        backgroundColor: theme.colors.scaryBackground,
    },
    managementButtonText: {
        color: theme.colors.textOnPrimary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        textAlign: 'center',
    },
});

const ReviewItem = ({ review, showManagementButtons, useRepoName, refetch }) => {
    const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION);
    const localizedReviewDate = new Date(review.createdAt).toLocaleDateString();

    const openDeleteReviewAlert = () => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete', style: 'destructive', onPress: async () => {
                    await deleteReview({ variables: { reviewId: review.id } });
                    await refetch();
                }
            }
        ]);
    };

    return (
        <View style={styles.reviewCardContainer}>
            <View style={styles.reviewCard}>
                <View style={styles.reviewScore}>
                    <Text style={styles.reviewScoreText}>{review.rating}</Text>
                </View>
                <View style={styles.reviewMain}>
                    <Text fontSize='subheading' fontWeight='bold'>{useRepoName ? review.repository.fullName : review.user.username}</Text>
                    <Text color='textSecondary'>{localizedReviewDate}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            {showManagementButtons && (<View style={styles.managementButtonContainer}>
                <Link style={styles.managementButton}
                    to={`/Repo/${review.repository.id}`}>
                    <Text style={styles.managementButtonText}>View repository</Text>
                </Link>
                <Pressable style={[styles.managementButton, styles.managementButtonScary]}
                    onPress={openDeleteReviewAlert}>
                    <Text style={styles.managementButtonText}>Delete review</Text>
                </Pressable>
            </View>)}
        </View>
    );
}

export default ReviewItem;
