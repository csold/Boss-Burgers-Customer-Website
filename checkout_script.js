// Initialize Firebase
var config = {
  apiKey: "AIzaSyAB6Gedku794rF0vZzLOeOr0QFyOXzgOGM",
  authDomain: "boss-burgers.firebaseapp.com",
  databaseURL: "https://boss-burgers.firebaseio.com",
  projectId: "boss-burgers",
  storageBucket: "boss-burgers.appspot.com",
  messagingSenderId: "415437985852"
};
firebase.initializeApp(config);
var fbref = firebase.database().ref();
var order = JSON.parse(localStorage["order"]);
  //Confirm Order
  function formSubmit(form) {
    var fbref = firebase.database().ref().child('orders')
    var orderKey = fbref.push().key;
    var uName = document.getElementById("name").value;
    var uEmail = document.getElementById("email").value;
    var uNumber = document.getElementById("number").value;
    var uPrice = 0;
    var uOrder = [];

    //Search through each burger
    order.forEach(function(item, index) {
      var burgerKey = fbref.child(orderKey).push().key;
      var burgerName = item[0];
      uPrice += item[1];
      //Get ingredients of each burger
      var ingr = {};
      var tempArray = [];
      item[2].forEach(function(item, index) {
        if (tempArray.includes(item)) {
          ingr[item] = ingr[item]+1;
        } else {
          ingr[item] = 1;
          tempArray.push(item);
        }
      });
      fbref.child(orderKey).child('burgers').child(burgerKey).set({name:burgerName, ingredients:ingr});
    });
    fbref.child(orderKey).update({name:uName, email:uEmail, number:uNumber, price:(uPrice*100)});
    localStorage.removeItem(order);
  }
  reloadTable();

//Display order table
function reloadTable() {
  var table = document.getElementById('output');
  table.innerHTML = "";
  var total = 0;
  order.forEach(function(item, index) {
    total += item[1];
    var tr = document.createElement("tr");
    var remove = document.createElement("td");
    var span = document.createElement("span");
    span.setAttribute("class", "btn btn-danger remove-item");
    span.innerHTML = "x";
    span.addEventListener('click', function() {
      order.splice(index, 1);
      localStorage['order'] = JSON.stringify(order);
      reloadTable();
    });
    remove.appendChild(span);
    var burgerName = document.createElement("td");
    burgerName.innerHTML = item[0];
    var burgerIngr = document.createElement("td");
    // var ingString="";
    burgerIngr.innerHTML = "";
    item[2].forEach(function(item, index) {
      burgerIngr.innerHTML += item+"</br>";
    });
    // burgerIngr.innerHTML = ingString;
    var burgerPrice = document.createElement("td");
    burgerPrice.innerHTML = "$"+item[1];
    tr.appendChild(remove);
    tr.appendChild(burgerName);
    tr.appendChild(burgerIngr);
    tr.appendChild(burgerPrice);
    table.appendChild(tr);
  });
  var row = document.createElement("tr");
  for (var i = 1; i < 6; i++) {
    var dt = document.createElement("td");dt.innerHTML=" ";
    row.appendChild(dt);
  }
  var totalPrice = document.createElement("td");dt.innerHTML="Total $"+total.toFixed(2);
  row.appendChild(totalPrice);
  table.append(row);
}

  // $(document).ready(function () {
  //     outputCart();
  //     //Remove item
  //     $('#output').on('click','.remove-item',function(){
  //         var itemToDelete = $('.remove-item').index(this);
  //         shopcart.splice(itemToDelete,1);
  //         sessionStorage["sca"] = JSON.stringify(shopcart);
  //         outputCart();
  //     })
  //     $('#output').on('change', '.dynqua', function () {
  //         var iteminfo = $(this.dataset)[0];
  //         var itemincart = false;
  //         var removeItem = false;
  //         var itemToDelete = 0;
  //         console.log(shopcart);
  //         var qty = $(this).val();
  //         $.each(shopcart, function (index, value) {
  //             if (value.id == iteminfo.id) {
  //                 if (qty <= 0) {
  //                     removeItem = true;
  //                     itemToDelete = index;
  //                 }else{
  //                     shopcart[index].qty = qty;
  //                     itemincart = true;
  //                 }
  //             }
  //         })
  //         if(removeItem){
  //             shopcart.splice(itemToDelete,1);
  //         }
  //         sessionStorage["sca"] = JSON.stringify(shopcart);
  //         outputCart();
  //     })
  //     function outputCart() {
  //         if (sessionStorage["sca"] != null) {
  //             shopcart = JSON.parse(sessionStorage["sca"].toString());
  //         }
  //         console.log(sessionStorage["sca"]);
  //         console.log(shopcart);
  //         var holderHTML = '';
  //         var total = 0;
  //         var itemCnt = 0;
  //         $.each(shopcart, function (index, value) {
  //             var stotal = value.qty * value.price;
  //             var a = (index + 1);
  //             total += stotal;
  //             itemCnt += parseInt(value.qty);
  //             holderHTML += '<tr><td><span class="btn btn-danger remove-item">x</span></td><td><input size="5"  type="number" class="dynqua" name="quantity_'
  //              + a + '" value="' + value.qty + '" data-id="' + value.id + '"></td><td><input type="hidden" name="item_name_' + a + '" value="' + value.name
  //               + ' ' + value.s + '">' + value.name + '(' + value.s + ')</td><td><input type="hidden" name="amount_' + a + '" value="'
  //                + formatMoney(value.price) + '"> $' + formatMoney(value.price) + ' </td><td class="text-xs-right"> ' + formatMoney(stotal)
  //                 + '</td></tr>';
  //         })
  //         holderHTML += '<tr><td colspan="4" class="text-xs-right">Total</td><td class="text-xs-right">$' + formatMoney(total) + '</td></tr>';
  //         $('#output').html(holderHTML);
  //     }
  //     function formatMoney(n) {
  //         return (n / 100).toFixed(2);
  //     }
  // });
