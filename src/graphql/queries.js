import { gql } from "@apollo/client";
import { REPO_PARTS_FRAGMENT, REVIEW_PARTS_FRAGMENT } from "./fragments";

export const REPOSITORIES_QUERY = gql`
    query GetRepos {
        repositories {
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
    query Me {
        me {
            id
            username
        }
    }
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
