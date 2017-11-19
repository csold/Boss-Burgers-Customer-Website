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

// Logout listerner

logout.addEventListener('click', e=>{

    firebase.auth().signOut();
    window.location.href = "staff.html";
});

// ORDER HTML
// Function for creating order box

function createOrderBox(data) {
    var listItem = document.createElement("div");
    listItem.setAttribute("class", "order_list");

    var name = document.createElement("p");
    name.appendChild(document.createTextNode(data.child('name').val()));

    var number = document.createElement("p");
    number.appendChild(document.createTextNode(data.child('number').val()));

    var string = "";
    var order = document.createElement("p");

        listItem.appendChild(name);
    listItem.appendChild(number);

    orderRef.child(data.key).child('burgers').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var burger = document.createElement("p");
        var burString = childSnapshot.child('name').val();
        burString += ":";
        orderRef.child(data.key).child('burgers').child(childSnapshot.key).child('ingredients').once('value', function(ingSnapshot) {
          ingSnapshot.forEach(function(blah) {
            burString += "<br>"+blah.key+" x"+blah.val();
          });
          burger.innerHTML = burString;
          listItem.appendChild(burger);
        });
      string += childSnapshot.key;
      string += " x"+childSnapshot.val();
      string += "<br />";
    });
  });

  order.setAttribute("class", "order_food");
  var txt = document.createElement("span");
  txt.innerHTML = string;
  order.appendChild(txt);
  var price = document.createElement("p");
  price.appendChild(document.createTextNode("$"+data.child('price').val()/100));
  listItem.appendChild(price);

  // Check if order is ready
  firebase.database().ref().child('orders').child(data.key).once('value').then(function(snapshot) {
    if (snapshot.hasChild('ready')) {
      listItem.setAttribute("style", "background-color: #4CAF50; font-family: lucida sans, arial, sans-serif;");
    }
  });
  return listItem;
}

// Get orders from firebase
var orderRef = firebase.database().ref('orders');
var count = 0;

orderRef.on('child_added', function(data) {
  // Update order number
  count++;
  document.getElementById("orderNum").textContent="Orders in queue: " + count;

  // Create order box, attach to ready and add listener
  var listItem = createOrderBox(data);
  console.log(listItem)
  document.getElementById('dockets').appendChild(listItem);

  //Click on menu item when ready
  listItem.addEventListener("click", function() {
    //Check if order is ready
    firebase.database().ref().child('orders').child(data.key).once('value').then(function(snapshot) {
      if (snapshot.hasChild('ready')) {
        //Archive price under month
        firebase.database().ref().child('archive').child('monthlysales').once('value').then(function(monthSnap) {
          var orderPrice = data.child('price').val();
          var month = ""+(new Date().getMonth()+1);
          if (monthSnap.hasChild(month)) {
            var total = monthSnap.child(month).val() + orderPrice;
            firebase.database().ref().child('archive').child('monthlysales').child(month).set(total);
          } else
            firebase.database().ref().child('archive').child('monthlysales').child(month).set(orderPrice);
        });
        //Archive burger type and remove from ingredients
        firebase.database().ref().child('archive').child('burgerType').once('value').then(function(burgerSnap) {
          firebase.database().ref().child('orders').child(data.key).once('value').then(function(burgSnap) {
            console.log("not hitting " +burgSnap.key);
            burgSnap.child('burgers').forEach(function(childSnap) {
              console.log(childSnap.key);
              var burgName = childSnap.child('name').val();
              if (burgerSnap.hasChild(burgName)) {
                var burgTotal = burgerSnap.child(burgName).val() + 1;
                firebase.database().ref().child('archive').child('burgerType').child(burgName).set(burgTotal);
              } else firebase.database().ref().child('archive').child('burgerType').child(burgName).set(1);
              //Remove from burger ingredients from stock ingredients
              childSnap.child('ingredients').forEach(function(ingredient) {
                firebase.database().ref().child('ingrdnts').once('value').then(function(ingrdntList) {
                  var stockVal = ingrdntList.child(ingredient.key).val();
                  var burgerVal = ingredient.val();
                  firebase.database().ref().child('ingrdnts').child(ingredient.key).set(stockVal-burgerVal);
                });
              });
            });
            //Remove from orders
            firebase.database().ref().child('orders').child(data.key).remove();
          });
        });
        //Remove from ui
        document.getElementById('dockets').removeChild(listItem);
      } else {
        //Mark as ready on firebase
        firebase.database().ref().child('orders').child(data.key).update({ready:true});
        listItem.setAttribute("style", "background-color: #4CAF50; font-family: lucida sans, arial, sans-serif;");
      }
    });
  });
});
orderRef.on('child_removed', function(data) {
  //Update order number
  count--;
  document.getElementById("orderNum").textContent="Orders in queue: " + count;
});
