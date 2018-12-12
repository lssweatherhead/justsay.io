const graphql = require('graphql');

const PostIdeaType = require('./post-idea-type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        postIdea: {
            type: PostIdeaType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){

            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});