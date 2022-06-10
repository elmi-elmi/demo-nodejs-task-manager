const {MongoClient, ObjectId} = require('mongodb')

// connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url)

// database name
const dbName = 'task-manager';
//
// MongoClient.connect(url,{useNewUrlParser:true},(error, client)=>{
//     if(error){
//         return console.log('Unable to connect....')
//     }
//
//     const db = client.db(dbName);
//     db.collection('cols').insertOne({
//         name:'hi there',
//         age:'2'
//     },(error, result)=>{
//         if(error){
//             console.log('-----')
//         }
//         console.log(result)
//     })
// })
//


async function main(){
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const users = db.collection('users')

        users.deleteMany({name:"shah1"})
            .then(console.log)
            .catch(console.log)
        return 'done'
}

main()
    .then(console.log)
    .catch(console.error)


