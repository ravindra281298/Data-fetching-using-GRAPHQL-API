const expressGraphQL=require('express-graphql');
const express=require('express');
const app=express();
const {
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
}=require('graphql');


const{
    rootQueryType
}=require('./schema')


const schema=new GraphQLSchema({
    query:rootQueryType
});

app.use('/',expressGraphQL({
    schema: schema,
    graphiql:true
}));


const hostname='localhost';
const port=4000;
app.listen(port,hostname,()=>{
    console.log(`listening at http://${hostname}:${port}`);
});