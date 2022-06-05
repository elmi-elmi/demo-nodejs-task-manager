// const {MongoClient, ObjectId} = require('mongodb')
//
// // connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url)
//
// // database name
// const dbName = 'task-manager';
// //
// // MongoClient.connect(url,{useNewUrlParser:true},(error, client)=>{
// //     if(error){
// //         return console.log('Unable to connect....')
// //     }
// //
// //     const db = client.db(dbName);
// //     db.collection('cols').insertOne({
// //         name:'hi there',
// //         age:'2'
// //     },(error, result)=>{
// //         if(error){
// //             console.log('-----')
// //         }
// //         console.log(result)
// //     })
// // })
// //
//
//
// async function main(){
//         await client.connect();
//         console.log('Connected successfully to server');
//         const db = client.db(dbName);
//         const users = db.collection('users')
//
//         // users.findOne({_id:new ObjectId("629c60a5c33e2190a2949c29")},(error,result)=>{
//         //     console.log('error : ', error)
//         //     console.log('reslut : ', result)
//         // })
//
//     users.find({name:'tara1'}).toArray((error,results)=>{
//         console.log(results)
//     })
//
//
//         return 'done'
// }
//
// main()
//     .then(console.log)
//     .catch(console.error)
//


const doWork = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('hi')
    },1000)
})

doWork.then(console.log)
