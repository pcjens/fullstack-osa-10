import { useQuery } from '@apollo/client';
import { GET_REPOS_QUERY } from '../graphql/fragments';

const useRepositories = () => {
    const { data, loading } = useQuery(GET_REPOS_QUERY, { fetchPolicy: 'cache-and-network' });
    const repositories = data?.repositories;
    return { repositories, loading };
};

export default useRepositories;
