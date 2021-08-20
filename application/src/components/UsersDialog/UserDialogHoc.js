import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteUserMutation } from './mutation'
import { usersQuery } from "../UsersTable/queries";

const withGraphqlDelete = graphql(deleteUserMutation, {
    props: ({ mutate }) => ({
        deleteUser: id => mutate({
            variables: id,
            refetchQueries: [{ query: usersQuery }],
        }),
    }),
})

export default compose(withGraphqlDelete);
