import { gql } from "@apollo/client";

export const AUTHENTICATE_MUTATION = gql`
    mutation Authenticate($username: String!, $password: String!) {
        authenticate(credentials: {
            username: $username,
            password: $password,
        }) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW_MUTATION = gql`
    mutation CreateReview($review: CreateReviewInput) {
        createReview(review: $review) {
            repositoryId
        }
    }
`;
