import { gql } from "@apollo/client";
import { REPO_PARTS_FRAGMENT, REVIEW_PARTS_FRAGMENT } from "./fragments";

export const REPOSITORIES_QUERY = gql`
    query GetRepos($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String!, $first: Int, $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
            totalCount
            edges {
                node {
                    ...RepoParts
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
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
    query RepoUrl($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            ...RepoParts
            url
            reviews(first: $first, after: $after) {
                totalCount
                edges {
                    node {
                        ...ReviewParts
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
    ${REPO_PARTS_FRAGMENT}
    ${REVIEW_PARTS_FRAGMENT}
`;
