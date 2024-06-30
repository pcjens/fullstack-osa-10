import { useEffect } from 'react';
import { TextInput, FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    searchbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
        padding: 8,
        margin: 16,
        marginBottom: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 4,
    },
    searchbarIcon: {
        marginTop: 4,
        marginLeft: 6,
        fontSize: theme.fontSizes.subheading,
    },
    searchbarInput: {
        fontSize: theme.fontSizes.subheading,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortCriteriaPicker = ({ selectedSort, setSelectedSort }) => {
    return (
        <Picker prompt='Select an item...' selectedValue={selectedSort} onValueChange={(sort) => setSelectedSort(sort)}>
            <Picker.Item label='Latest repositories' value='createdAtDesc' />
            <Picker.Item label='Highest rated repositories' value='ratingDesc' />
            <Picker.Item label='Lowest rated repositories' value='ratingAsc' />
        </Picker>
    );
};

export const RepositoryListContainer = ({ repositories, onEndReach, sortCriteria, setSortCriteria, searchbarValue, setSearchbarValue }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={(
                <View>
                    <View style={styles.searchbarContainer}>
                        <Text style={styles.searchbarIcon}>🔎</Text>
                        <TextInput style={styles.searchbarInput} placeholder='Search for repositories...'
                            value={searchbarValue}
                            onChangeText={setSearchbarValue} />
                    </View>
                    <SortCriteriaPicker selectedSort={sortCriteria} setSelectedSort={setSortCriteria} />
                </View>
            )}
            renderItem={({ item }) => (
                <Link to={`/Repo/${item.id}`}>
                    <RepositoryItem repo={item} />
                </Link>
            )}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

const RepositoryList = () => {
    const [sortCriteria, setSortCriteria] = useState('createdAtDesc');
    const [searchbarValue, setSearchbarValue] = useState('');
    const [searchKeyword] = useDebounce(searchbarValue, 300);
    const { repositories, refetch, fetchMore } = useRepositories({ first: 4 });

    useEffect(() => {
        switch (sortCriteria) {
            default:
            case 'createdAtDesc':
                refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword });
                break;
            case 'ratingDesc':
                refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword });
                break;
            case 'ratingAsc':
                refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword });
                break;
        }
    }, [sortCriteria, searchKeyword]);

    return <RepositoryListContainer repositories={repositories} onEndReach={fetchMore}
        sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}
        searchbarValue={searchbarValue} setSearchbarValue={setSearchbarValue} />;
};

export default RepositoryList;
