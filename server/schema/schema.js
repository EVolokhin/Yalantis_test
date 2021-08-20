const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = graphql

const Users = require('../models/user')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        surname: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)},
        photo: {type: new GraphQLNonNull(GraphQLString)},
    })
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:     {
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                surname: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                photo: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const user = new Users({
                    name: args.name,
                    surname: args.surname,
                    email: args.email,
                    photo: args.photo,
                })
                return user.save()
            },
        },
        deleteUser: {
            type: UserType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return Users.findByIdAndRemove(args.id)
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: {type: GraphQLID},
                name: {type:new GraphQLNonNull(GraphQLString)},
                surname: {type:new GraphQLNonNull(GraphQLString)},
                email: {type:new GraphQLNonNull(GraphQLString)},
                photo: {type:new GraphQLNonNull(GraphQLString)},

            },
            resolve(parent,args){
                return Users.findByIdAndUpdate(
                    args.id,
                    {$set: {
                            name: args.name,
                            surname: args.surname,
                            email: args.email,
                            photo: args.photo,
                        }},
                    {new: true},
                )
            },
        },
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                return Users.findById(args.id)
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find({})
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})