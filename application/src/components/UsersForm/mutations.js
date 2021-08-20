import { gql } from 'apollo-boost'

export const addUserMutation = gql`
    mutation addUser($name: String!, $surname: String!, $email: String!, $photo: String!) {
        addUser(name: $name, surname: $surname, email: $email, photo: $photo) {
            name
        }
    }
`