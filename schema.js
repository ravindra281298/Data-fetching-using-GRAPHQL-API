//"Egni_u010_l11-l21-l31-l41-l51-l61-l71-l81-l92-l103_000001"
const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const url='mongodb://localhost:27017/';
const dbName="luke-hydra-test-management-dev-beta";
const myColl="hierarchicalAnalysis";
var db=1;
coll=1;


MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    db=client.db(dbName);
    coll=db.collection(myColl);
    console.log(`connected to database: ${dbName}`);
});

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
}=require('graphql');


const marksType=new GraphQLObjectType({
    name:'marksType',
    description:'This is marks Type',
    fields:()=>({
        minMarks:{type:GraphQLInt},
        maxMarks:{type:GraphQLInt}
    })
});

const subjectType=new GraphQLObjectType({
    name:'subjectType',
    description:'This is subject Type',
    fields:()=>({
        Chemistry:{type:marksType},
        Physics:{type:marksType},
        Maths:{type:marksType}
    })
});

const dataType=new GraphQLObjectType({
    name:'dataType',
    description:'This is data Type',
    fields:()=>({
        topicAnalysis:{type:subjectType},
        parent:{type:GraphQLString},
        _id:{type:GraphQLString}
    })
});

exports.rootQueryType=new GraphQLObjectType({
    name:'rootQueryType',
    description:'This is root query',
    fields:()=>({
        marks:{
            type:dataType,
            args:{
                id:{type:GraphQLList(GraphQLString)}
            },
            resolve:(root,args)=> coll.findOne({_id:args.id[0]})
        }
    })
});