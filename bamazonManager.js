var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
       host:'localhost',
       port:'3306',
       user:'root',
       password:'root',
       database:'bamazon'
});
connection.connect(function(err){
    if(err) throw err;
    start();
})
var start = function(){
    inquirer.prompt({
        name:'action',
        type : 'list',
        choices : [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product' ,
            'End Session'
        ],
        message:'What would you like to do?'
    }).then(function(ans){
        switch(ans.action){
            case 'View Products for Sale': viewProducts();
            break;
            case 'View Low Inventory': viewInventory();
            break;
            case 'Add to Inventory': addInventory();
            break;
            case 'Add New Product': addNewProduct();
            break;
            case 'End Session': console.log('Good Bye...')
        }
    });
}
var viewProducts = function(){
    console.log('\n---- View All Inventory ----\n\n');
    
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
      
        for(var i = 0; i<res.length;i++){
            console.log('Item id: ' + res[i].item_id,' | Product Name: ' + res[i].product_name + ' | Department: '+ res[i].department_name + ' | Price: ' + res[i].price + ' | Stocks: ' + res[i].stock_quantity) ;
            console.log('------------------------------------------------------------------------------------------------------------------')
        }        
        start();
    });
}
var viewInventory = function(){
    console.log('\n----  View Low inventory items ----\n\n');

    connection.query('SELECT * FROM products', function(err,res){
        if(err) throw err;

        for (var i=0; i < res.length; i++){
            if(res[i].stock_quantity <= 5){
                
            console.log('Item id: ' + res[i].item_id,' | Product Name: ' + res[i].product_name + ' | Department: '+ res[i].department_name + ' | Price: ' + res[i].price + ' | Stocks: ' + res[i].stock_quantity) ;
            console.log('------------------------------------------------------------------------------------------------------------------')  
            }   
        } 
        start();  
    });  
}
var addInventory = function(){
    console.log('\n----  Add to inventory ----\n\n');
    connection.query('SELECT * FROM products ', function(err,res){
        inquirer.prompt([
            {
            name:'id',
            type:'input',
            message:'Please enter the item id of the product you wish to add inventory into ', 
            validate:function(value){
                if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                    return true;
                }else {
                    return false;
                }        
            }
            },{
            name:'quantity',
            type:'input',
            message:'How many items would you like to add to the product?', 
            validate:function(value){
                if(isNaN(value) == false){
                    return true;
                }else {
                    return false;
                }     
            }
        }]).then(function(ans){
            var inventoryToAdd = (ans.id)-1;
            var howManyToAdd = parseInt(ans.quantity);           
            connection.query('UPDATE products SET ? WHERE ?',[
                {stock_quantity:(res[inventoryToAdd].stock_quantity+howManyToAdd)},
                {item_id:ans.id}, 
                //Make sure NOT to use 'res' here otherwise an error 'undefined'occurs   
            ],function(err,result){
                console.log('\n----- The quantity has been updated ---\n');
                start();
            });                         
        });
    });                       
}

var addNewProduct = function(){
    console.log('\n----  Add new product ----\n');
    var deptArr=[];
    connection.query('SELECT * FROM departments', function(err,res){
        if(err) throw err;
        for (var i=0; i < res.length; i++){
            deptArr.push(res[i].department_name);
        }
    })
    inquirer.prompt([
        {
        name:'product',
        type:'input',
        message:'Product Name: ',  
        validate:function(value){
        if(value){return true;}
        else{return false;}
        }      
    },{
        name:'department',
        type:'list',
        choices:deptArr,
        message:'Department: ',
    },{
        name:'price',
        type:'input',
        message:'Price: ',
        validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
        }
    },{
        name:'qty',
        type:'input',
        message:'Quantity: ',
        validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
        }
    },
    ]).then(function(ans){
        connection.query('INSERT INTO products SET ? ' ,{
            product_name:ans.product,
            department_name:ans.department,
            price:ans.price,
            stock_quantity:ans.qty,         
        },function(err,result){
            if(err) throw err;
            console.log('\n---- New product has been added ----\n');
            start();
        });             
    });
}