import { useQuery } from '@apollo/client';
import { GET_REPOS_QUERY } from '../graphql/fragments';

const useRepositories = () => {
    const { data, loading, refetch } = useQuery(GET_REPOS_QUERY, { fetchPolicy: 'cache-and-network' });
    const repositories = data?.repositories;

    return { repositories, loading, refetch };
};

export default useRepositories;
