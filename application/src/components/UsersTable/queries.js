import { gql } from 'apollo-boost'

export const usersQuery = gql`
    query usersQuery {
        users {
            id
            name
            surname
            email
            photo
        }
    }
`