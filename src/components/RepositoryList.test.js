import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "./RepositoryList";
import { NativeRouter } from "react-router-native";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            const statNumberText = (number) => {
                if (number >= 1000) {
                    return `${(number / 1000).toFixed(1)}k`;
                } else {
                    return `${number}`;
                }
            };

            render(
                <NativeRouter>
                    <RepositoryListContainer repositories={repositories} />
                </NativeRouter>
            );
            expect(screen.getByText('Build forms in React, without the tears')).toBeDefined();
            for (const { node: repo } of repositories.edges) {
                const repoComponent = screen.getByTestId(`repository-item-${repo.fullName}`);
                expect(repoComponent).toHaveTextContent(statNumberText(repo.fullName));
                expect(repoComponent).toHaveTextContent(statNumberText(repo.description));
                expect(repoComponent).toHaveTextContent(statNumberText(repo.language));
                expect(repoComponent).toHaveTextContent(statNumberText(repo.stargazersCount));
                expect(repoComponent).toHaveTextContent(statNumberText(repo.forksCount));
                expect(repoComponent).toHaveTextContent(statNumberText(repo.reviewCount));
                expect(repoComponent).toHaveTextContent(statNumberText(repo.ratingAverage));
            }
        });
    });
});