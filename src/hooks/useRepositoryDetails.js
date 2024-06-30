import { useQuery } from '@apollo/client';
import { REPOSITORY_DETAILS_QUERY } from '../graphql/queries';

const useRepositoryDetails = (variables) => {
    const { data, loading, error, refetch, fetchMore } = useQuery(REPOSITORY_DETAILS_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables,
    });
    const repository = data?.repository;

    const handleFetchMore = async () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        return fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return { repository, loading, error, refetch, fetchMore: handleFetchMore };
};

export default useRepositoryDetails;
