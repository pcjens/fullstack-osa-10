import { useQuery } from '@apollo/client';
import { REPOSITORIES_QUERY } from '../graphql/queries';

const useRepositories = (variables) => {
    variables = { ...variables, orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: '' };
    const { data, loading, refetch, fetchMore } = useQuery(REPOSITORIES_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables,
    });
    const repositories = data?.repositories;

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        return fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return { repositories, loading, refetch, fetchMore: handleFetchMore };
};

export default useRepositories;
