import { gql } from "@apollo/client";

export const REPO_PARTS_FRAGMENT = gql`
    fragment RepoParts on Repository {
        id
        fullName
        description
        language
        reviewCount
        ratingAverage
        forksCount
        stargazersCount
        ownerAvatarUrl
    }
`;
