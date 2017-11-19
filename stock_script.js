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

//logout listerner
    
logout.addEventListener('click', e=>{
     firebase.auth().signOut();
    window.location.href = "staff.html";
});


// var ingrdnts = firebase.database().ref().child('ingrdnts').set({buns:100,beef:100,lettuce:100,tomato:100,cheese:100,chicken:100,softDrink:100});
var ingRef = firebase.database().ref('ingrdnts');
ingRef.on('child_added', function(data) {
  //Populate stock
  var listItem = document.createElement("div");
  listItem.setAttribute("class", "order_list");

  var name = document.createElement("p");
  name.appendChild(document.createTextNode(data.key));
  var quantity = document.createElement("p");
  var qntrty = data.val();
  quantity.appendChild(document.createTextNode("Quantity: "+qntrty));
  var div = document.createElement("div");
  // form.setAttribute("onsubmit", "formSubmit(this)");
  // form.setAttribute("action", "#");
  var input = document.createElement("input");
  var btnInput = document.createElement("input");
  btnInput.setAttribute("type", "submit");
  btnInput.setAttribute("value", "Add");
  input.setAttribute("type", "number");
  input.setAttribute("name", "quant");

  btnInput.addEventListener('click', function() {
    var addedAmount = parseInt(input.value);
    quantity.innerHTML = "Quantity: "+(qntrty+=addedAmount);
    firebase.database().ref().child('ingrdnts').child(data.key).set(qntrty);
  });
  input.setAttribute("class", "stockInput");
  function formSubmit(form) {
    console.log("hello");
  }

  listItem.appendChild(name);
  listItem.appendChild(quantity);
  div.appendChild(input);
  div.appendChild(btnInput);
  listItem.appendChild(div);
  document.getElementById('orders').appendChild(listItem);
});
