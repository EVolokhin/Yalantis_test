import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addUserMutation } from './mutations';
import { usersQuery } from "../UsersTable/queries";

import { styles } from './styles';

const withGraphqlAdd = graphql(addUserMutation, {
    props: ({ mutate }) => ({
        addUser: user => mutate({
            variables: user,
            refetchQueries: [{ query: usersQuery }],
        }),
    }),
})

export default compose(withStyles(styles), withGraphqlAdd);
