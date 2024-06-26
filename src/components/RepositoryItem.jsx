import { Pressable, View, StyleSheet, Image } from "react-native";
import * as Linking from 'expo-linking';
import Text from "./Text";
import theme from '../theme';
import StatBox from "./StatBox";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.contentBackground,
        padding: 16,
    },
    repoDescriptionContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    repoDescriptionTextContainer: {
        gap: 4,
        flexShrink: 1,
    },
    repoStatsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,
    },
    favicon: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginTop: 4,
    },
    bigLinkButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textOnPrimary,
        textAlign: 'center',
        padding: 14,
        borderRadius: 4,
        marginTop: 16,
    },
});

const RepositoryItem = ({ repo, showLink }) => {
    return (
        <View testID={`repository-item-${repo.fullName}`} style={styles.container}>
            <View style={styles.repoDescriptionContainer}>
                <Image style={styles.favicon} source={{ uri: repo.ownerAvatarUrl }} />
                <View style={styles.repoDescriptionTextContainer}>
                    <Text fontSize='subheading' fontWeight='bold'>{repo.fullName}</Text>
                    <Text color='textSecondary'>{repo.description}</Text>
                    <Text isBadge style={{ marginTop: 3 }}>{repo.language}</Text>
                </View>
            </View>
            <View style={styles.repoStatsContainer}>
                <StatBox title='Stars' number={repo.stargazersCount} />
                <StatBox title='Forks' number={repo.forksCount} />
                <StatBox title='Reviews' number={repo.reviewCount} />
                <StatBox title='Rating' number={repo.ratingAverage} />
            </View>
            {showLink && repo.url && (
                <Pressable onPress={() => Linking.openURL(repo.url)}>
                    <Text fontSize={'subheading'} fontWeight={'bold'} style={styles.bigLinkButton}>
                        Open in GitHub
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

export default RepositoryItem;
