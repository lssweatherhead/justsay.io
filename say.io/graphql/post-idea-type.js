const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const PostIdeaType = new GraphQLObjectType({
    name: 'PostIdea',
    fields: () => ({
        id: { type: GraphQLString },
        memberId: { type: GraphQLString },
        title: { type: GraphQLString },
        datePublished: { type: GraphQLString },
        status: { type: GraphQLString },
        genre: { type: GraphQLString },
        wordCount: { type: GraphQLString },
        publication: { type: GraphQLString }
    })
});

module.exports = PostIdeaType;