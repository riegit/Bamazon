 var mysql = require('mysql');
 var inquirer = require('inquirer');

 var connection = mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'bamazon'
 });

var start =function(){
    connection.query('SELECT * FROM products',function(err,res){
        if(err) throw err;

        console.log('\n\n~~~~~ BAMAZON SHOPPING CENTER ~~~~\n\n');

        for (var i=0; i < res.length; i++){
            console.log('Item id: ' + res[i].item_id,' | Product Name: ' + res[i].product_name + ' | Department: '+ res[i].department_name + ' | Price: ' + res[i].price + ' | Stocks: ' + res[i].stock_quantity) ;
            console.log('------------------------------------------------------------------------------------------------------------------')
        }   
        inquirer.prompt([
            {
            name:'id',
            type:'input',
            message:'Please enter the product id you wish to buy.', 
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
            message:'How many items would you like to buy?', 
            validate:function(value){
                if(isNaN(value) == false){
                    return true;
                }else {
                    return false;
                }     
            }
        }]).then(function(ans){
            var productToBuy = (ans.id)-1;
            var howManyToBuy = parseInt(ans.quantity);
            var totalPrice = parseFloat((res[productToBuy].price) * howManyToBuy).toFixed(2);
            //check to see if the quantity is enough, then UPDATE the stock in table, products 
            if(res[productToBuy].stock_quantity >= ans.quantity){
                connection.query('UPDATE products SET ? WHERE ?',[
                    {stock_quantity:(res[productToBuy].stock_quantity-howManyToBuy)},
                    {item_id:ans.id}, 
                    //Make sure NOT to use 'res' here otherwise an error 'undefined'occurs   
                ],function(err,result){
                    console.log('\nPlease review your order:\n '+'\nProduct Name: '+res[productToBuy].product_name +'\nPrice: '+ res[productToBuy].price +'\nQuantity: ' + ans.quantity + '\nTotal: $ ' + res[productToBuy].price * ans.quantity + '\n');
                    buyAnother();
                });               
            }else{
                console.log('\nSorry, we do not have enough quantity!\n');
                buyAnother();
            }
        });                                 
    }) //connection END  
}// function start END
var buyAnother = function(){
    inquirer.prompt({
        name:'buyAnother',
        type:'confirm',
        message:'Would you like to buy another item?'
    }).then(function(ans){
        if(ans.buyAnother){
            start();
        }else{
            console.log('\nCome again please!');
        }
    })
}
start();
