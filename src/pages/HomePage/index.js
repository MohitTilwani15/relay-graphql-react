import React from 'react';
import { graphql } from 'relay-runtime';

export default [{
	path: '/',
	components: () => [import('./HomePage')],
	query: graphql`
		query HomePageQuery {
			...HomePage
		}
	`,
	render: ([HomePage], data) => ({
		title: 'Song List',
		component: <HomePage data={data} />,
		chunks: ['HomePage'],
	}),
}]
