import { gql } from 'apollo-boost'

export const addUserMutation = gql`
    mutation addUser($name: String!, $surname: String!, $email: String!, $photo: String!) {
        addUser(name: $name, surname: $surname, email: $email, photo: $photo) {
            id
        }
    }
`

export const updateUserMutation = gql`
    mutation updateUser($id: ID, $name: String!, $surname: String!, $email: String!, $photo: String!) {
        updateUser(id: $id, name: $name, surname: $surname, email: $email, photo: $photo) {
            name
        }
    }
`