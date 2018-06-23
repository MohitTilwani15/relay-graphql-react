import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation createSongMutation($title: String) {
    addSong(title: $title) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;

function commit(environment, title) {
	return new Promise((resolve, reject) => {
		commitMutation(environment, {
			mutation,
      variables: { title },
      onCompleted(response, errors) {
        if (errors) {
          reject(errors[0]);
        } else {
          resolve(response);
        }
      },
      onError: reject,
		});
	});
}

export default { commit };