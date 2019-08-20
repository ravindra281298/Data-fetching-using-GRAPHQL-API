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

