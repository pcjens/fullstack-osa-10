import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { REPOSITORY_DETAILS_QUERY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';

const RepositoryDetails = () => {
    const { repoId } = useParams();
    const { data, loading, error } = useQuery(REPOSITORY_DETAILS_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: { id: repoId },
    });

    if (loading) {
        return (<Text>Loading...</Text>);
    }
    if (error) {
        console.error(error);
        return (<Text>{error.toString()}</Text>);
    }

    return (
        <RepositoryItem repo={data?.repository} showLink />
    );
};

export default RepositoryDetails;
