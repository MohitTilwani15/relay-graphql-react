import { graphql, commitMutation } from 'react-relay';

const mutation = graphql`
  mutation deleteSongMutation($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

function commit(environment, id) {
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      mutation,
      variables: { id },
      updater: (store) => {
        store.delete(id);
      },
    });
  });
}

export default { commit };
