var dish = "";
var dropDown = "";

var data ={
    drinks : {
        wine : [{
                id : "wine01",
                name: "Beaux Freres",
                price : 7.50,
                img : "images/wine1.png"

            },{
                id: "wine02",
                name : "chateau",
                price : 3.00,
                img: "images/wine1.png"
            }],
        beer : [{
            id: "beer01",
            name: "beer01",
            price : 4.5,
            img : "images/wine1.png"
        }]
    },
    food : {
        fastfood: [{
            id: "fastfood01",
            name: "fastfood01",
            price : 43.5,
            img : "images/wine1.png"
        }],
        dinner : [{
            id: "dinner01",
            name: "dinner",
            price : 45.0,
            img : "images/wine1.png"
        }]
    },
    desert: {
        sweet : [{
            id: "sweet01",
            name: "sweet01",
            price : 8.5,
            img : "images/wine1.png"
        }],
        salt : [{
            id: "salt01",
            name: "salt01",
            price : 14.5,
            img : "images/wine1.png"
        }]
    }
}

var cart = {
    discount : 0,
    tax : 0,
    subTotal : "",
    total : "",
    dishes : {}
}

if(!dish){
    changeDropDown("drinks")
}


function addValue(tempData){
    let tempValue = tempData.split(",");
    let id = tempValue[0];
    let name = tempValue[1];
    let price = tempValue[2];
    let quantity = document.getElementById(id)
    console.log("quantityyyy " + quantity);
    quantity.innerHTML = parseInt(quantity.innerHTML) + 1;
    console.log(quantity.innerHTML);
    if(!cart.dishes[dish]){
        cart.dishes[dish] = {};
        cart.dishes[dish]['total'] = 0
        cart.dishes[dish]['item'] = []
    }
    let tempDish = cart.dishes[dish]['item'];
    let isDishPresent = _.find(tempDish, function(obj){
        return obj.id === id;
    })
    if(!isDishPresent){
        let tempObj = {
            id : id,
            qty : quantity.innerHTML,
            name : name,
            price : price
        }
        cart.dishes[dish]['item'].push(tempObj)
    } else {
        _.forEach(cart.dishes[dish]['item'], function(obj){
            if(obj.id === id){
                obj.qty = quantity.innerHTML
            }
        })
    }
    calCart();
}

function calCart(){
    let tempSubTotal = 0;
    let noItemFlag = true
    _.forEach(cart.dishes, function(item){
        let tempDishTotal = 0;
        noItemFlag = false
        _.forEach(item.item, function(obj){
            obj.total =  parseFloat(obj.price)*parseInt(obj.qty)
            tempDishTotal = obj.total+ tempDishTotal;
        })
        item.total = tempDishTotal;
        tempSubTotal = tempSubTotal + tempDishTotal;
    })
    if(!noItemFlag){
        cart.discount = 4;
        cart.tax = 22
    } else {
        cart.discount = 0;
        cart.tax = 0;
    }
    cart.subTotal = tempSubTotal;
    cart.total = cart.subTotal + cart.tax;
    cart.total = cart.total - cart.discount;
    renderCart()
}

function renderCart(){
    var divCart = document.getElementById("cart"); 
    divCart.innerHTML = "";
    var menuCart = "";
    _.forEach(cart.dishes, function(value, index){
        let subMenu = ""
        _.forEach(value.item, function(obj){
            subMenu += '<tr><td>'+obj.name+'</td><td>$'+obj.price+' x '+obj.qty+'</td><td>$'+obj.total+'</td></tr>'
        })
        menuCart += '<div><table><tbody><th>'+index+'</th><th></th><th>$'+value.total+'</th>'+subMenu+'</tbody></table></div>'
    })
    divCart.innerHTML += menuCart+'<div class ="amount"><div class="food-price"><p>Subtotal</p><h5>$'+cart.subTotal+'</h5></div><div class="food-price"><p>Estimate Taxes</p><h5>$'+cart.tax+'</h5></div><div class="food-price"><p>Discount</p><h5>$'+cart.discount+'</h5></div><a class="submit"><button >PAY $'+cart.total+'</button></a></div>'
}

function removeValue(id){
    let quantity = document.getElementById(id)
    if(parseInt(quantity.innerHTML) > 0){
        quantity.innerHTML = parseInt(quantity.innerHTML) - 1
    }
    let removeFlag = false
    if(cart.dishes[dish]){
        _.forEach(cart.dishes[dish]['item'], function(obj){
            if(obj.id === id){
                if(parseInt(obj.qty) === 1){
                    removeFlag = true
                } else {
                    obj.qty = quantity.innerHTML
                }
            }
        })
    }
    

    if(removeFlag){
        cart.dishes[dish] = _.reject(cart.dishes[dish]['item'], function(obj){
            return obj.id === id;
        })
        if(!cart.dishes[dish]['item']){
            delete cart.dishes[dish]
        }
    }

    calCart()
}

function changeDropDown(type){
    dish = type;
   // console.log(dish);
    var select = document.getElementById("drpDwn"); 
    select.innerHTML = "";
    var options = data[type]; 
    // console.log(options)
    _.forEach(options, function(value, index) {
        var opt = index;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    });
   if(!dropDown){
        changeMenu()
    }
}

function changeMenu(){
    var select = document.getElementById("drpDwn"); 
    var value = select.value;
    console.log("value" + value);
    var option = data[dish][value]
    console.log(option);
    var menu = document.getElementById("menu"); 
    menu.innerHTML = "";

    _.forEach(option, function(item){
        menu.innerHTML += '<div class="wrapper"><img src ='+item.img+' alt="wine" ><div class="info"><h3>'+item.name+'</h3><h4>$'+item.price+'</h4><div class="add-remove"><button onclick="addValue('+"'"+item.id+","+item.name+","+item.price+"'"+')">+</button><button id ='+item.id+'>0</button><button onclick = "removeValue('+"'"+item.id+"'"+')">-</button></div></div></div>'                                         
    })
}

// Create a object, where all data would be stored
