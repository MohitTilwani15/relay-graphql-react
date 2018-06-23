import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation createLyricMutation($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

function commit(environment, content, songId) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { content, songId },
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

export default { commit }