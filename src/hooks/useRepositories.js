import { useQuery } from '@apollo/client';
import { REPOSITORIES_QUERY } from '../graphql/queries';

const useRepositories = () => {
    const { data, loading, refetch } = useQuery(REPOSITORIES_QUERY, { fetchPolicy: 'cache-and-network' });
    const repositories = data?.repositories;

    return { repositories, loading, refetch };
};

export default useRepositories;
