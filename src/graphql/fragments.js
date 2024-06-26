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

export const REVIEW_PARTS_FRAGMENT = gql`
    fragment ReviewParts on Review {
        id
        text
        rating
        createdAt
        user {
            id
            username
        }
    }
`;
