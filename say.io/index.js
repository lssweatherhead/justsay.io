const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');

const schema = require('./graphql/schema');
const PostIdea = require('./models/post-idea');

mongoose.connect('mongodb://sayio-dev:zjNgverZGkx5WVLuGirU@ds024548.mlab.com:24548/sayio');

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

const init = async() => {
    await server.register([{
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    },
    {
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    }
    ]);

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function(req, resp) {
                return '<h1>Sup?</h1>'
            }
        },
        {
            method: 'GET',
            path: '/api/v1/1/postIdeas',
            handler: function(req, resp) {
                return PostIdea.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/1/postIdeas',
            handler: function(req, resp) {
                const { memberId, title, datePublished, status, genre, wordCount, publication } = req.payload;
                const post = new PostIdea({
                    memberId,
                    title,
                    datePublished,
                    status,
                    genre,
                    wordCount,
                    publication
                });
                
                return post.save();
            }
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

init();