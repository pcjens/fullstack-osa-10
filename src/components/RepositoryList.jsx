import { useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
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

export const RepositoryListContainer = ({ repositories, sortCriteria, setSortCriteria }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={<SortCriteriaPicker selectedSort={sortCriteria} setSelectedSort={setSortCriteria} />}
            renderItem={({ item }) => (
                <Link to={`/Repo/${item.id}`}>
                    <RepositoryItem repo={item} />
                </Link>
            )}
        />
    );
};

const RepositoryList = () => {
    const [sortCriteria, setSortCriteria] = useState('createdAtDesc');
    const { repositories, refetch } = useRepositories();

    useEffect(() => {
        switch (sortCriteria) {
            default:
            case 'createdAtDesc':
                refetch({ orderBy: 'CREATED_AT', orderDirection: 'DESC' });
                break;
            case 'ratingDesc':
                refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' });
                break;
            case 'ratingAsc':
                refetch({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' });
                break;
        }
    }, [sortCriteria]);

    return <RepositoryListContainer repositories={repositories} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />;
};

export default RepositoryList;
