/**
 * Created by hexad3cimal on 12/2/17.
 */
var mysql=require('mysql');
var connection=mysql.createPool({

    host:'localhost',
    user:'root',
    password:'root',
    database:'node_test'

});
module.exports=connection;
