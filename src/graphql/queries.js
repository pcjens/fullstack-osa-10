import { gql } from "@apollo/client";
import { REPO_PARTS_FRAGMENT } from "./fragments";

export const GET_REPOS_QUERY = gql`
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
