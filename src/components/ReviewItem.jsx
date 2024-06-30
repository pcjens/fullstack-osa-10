import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    reviewCard: {
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

export default ReviewItem;
