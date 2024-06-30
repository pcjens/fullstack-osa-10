import { gql } from "@apollo/client";
import { REPO_PARTS_FRAGMENT, REVIEW_PARTS_FRAGMENT } from "./fragments";

export const REPOSITORIES_QUERY = gql`
    query GetRepos($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String!) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    ...RepoParts
                }
            }
        }
    }
    ${REPO_PARTS_FRAGMENT}
`;

export const ME_QUERY = gql`
    query Me($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewParts
                    }
                }
            }
        }
    }
    ${REVIEW_PARTS_FRAGMENT}
`;

export const REPOSITORY_DETAILS_QUERY = gql`
    query RepoUrl($id: ID!) {
        repository(id: $id) {
            ...RepoParts
            url
            reviews {
                edges {
                    node {
                        ...ReviewParts
                    }
                }
            }
        }
    }
    ${REPO_PARTS_FRAGMENT}
    ${REVIEW_PARTS_FRAGMENT}
`;
