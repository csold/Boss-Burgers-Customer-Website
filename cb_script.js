//Customise burgers
var hawaiian = document.getElementById('hawaiian');
var beeforama = document.getElementById('beeforama');
var palohalo = document.getElementById('palohalo');

var largeFries = document.getElementById('lfries');
var smallFries = document.getElementById('sfries');
var milkshake = document.getElementById('milkshake');
var softdrink = document.getElementById('softdrink');
largeFries.addEventListener('click', function() {addExtra('Large Fries', 3)});
smallFries.addEventListener('click', function() {addExtra('Small Fries', 2)});
milkshake.addEventListener('click', function() {addExtra('Milkshake', 3)});
softdrink.addEventListener('click', function() {addExtra('Softdrink', 1)});
function addExtra(name, price) {
  order.push([name, price, []]);
  localStorage['order'] = JSON.stringify(order);
}

hawaiian.addEventListener('click', function() {openModal('Hawaiian', 6.2);});
beeforama.addEventListener('click', function() {openModal('Beeforama', 6.7);});
palohalo.addEventListener('click', function() {openModal('Palohalo', 6.5);});

var burgerModal = document.getElementById('burgerModal');

// var allIngr = ["beef":2, "cheese":1, "aioli":.5, "tomato":1, "pineapple":1, "chicken":2];
// var allIngr = {beef:2, cheese:1, aioli:.5, tomato:1, pineapple:1, chicken:2};
// var allIngr = [[beef,2], [cheese,1}, {aioli:.5}, {tomato:1}, {pineapple:1}, {chicken:2}];
var allIngr = [['beef',2], ['cheese',1], ['aioli',.5], ['tomato',1], ['pineapple',1], ['chicken',2]];
var addedIngrList;
var extras = [];
var name;
var price;
if (localStorage['order']!=null)
  order = JSON.parse(localStorage['order']);
else
  var order = [];

function openModal(burgerName, burgerPrice) {
  burgerModal.style.display = "block";
  name = burgerName;
  price = burgerPrice;
  document.getElementById('burgerTitle').innerHTML = name+" $"+price;
  document.getElementById('burgerImage').src="images/"+burgerName.toLowerCase()+".png"

  extras = [];

  //Create ingredient lists
  switch(burgerName) {
    case 'Beeforama':
      addedIngrList = ["beef", "cheese", "aioli", "tomato"];
      break;
    case 'Hawaiian':
      addedIngrList = ["beef", "cheese", "aioli", "pineapple"];
      break;
    case 'Palohalo':
      addedIngrList = ["chicken", "cheese", "aioli"];
      break;
  }
  resetIngr()
}

//Adds burger to order
var submitBurger = document.getElementById('confirmBurger');
submitBurger.addEventListener('click', function() {
  console.log('Fire!!');
  var ingredients = [];
  addedIngrList.forEach(function(item, index) {
    ingredients.push(item);
  });
  extras.forEach(function(item, index) {
    ingredients.push(item[0]);
  });
  console.log('Before Push' + [name, price, ingredients]);
  order.push([name, price, ingredients]);
  console.log('After Push' + order);
  localStorage["order"] = JSON.stringify(order);
  burgerModal.style.display = "none";
});

function resetIngr() {
  clearLists();
  //Display default ingredients to remove
  addedIngrList.forEach(function(item, index) {
    var removeBox = document.createElement("div");
    removeBox.setAttribute("class", "removeIngredient");
    removeBox.innerHTML = "- "+item;
    removeBox.addEventListener('click', function() {
      addedIngrList.splice(index, 1);
      resetIngr();
    });
    document.getElementById('ingListPlus').appendChild(removeBox);
  });

  //Display extra ingredients to remove
  extras.forEach(function(item, index) {
    var removeBox = document.createElement("div");
    removeBox.setAttribute("class", "removeIngredient");
    removeBox.innerHTML = "- "+item[0]+" $"+item[1];
    removeBox.addEventListener('click', function() {
      extras.splice(index, 1);
      price -= item[1];
      document.getElementById('burgerTitle').innerHTML = name+" $"+price;
      resetIngr();
    });
    document.getElementById('ingListPlus').appendChild(removeBox);
  });

  //Display extra ingredients to add
  allIngr.forEach(function(item, index) {
    var addBox = document.createElement("div");
    addBox.setAttribute("class", "addIngredient");
    addBox.innerHTML = "+ "+item[0]+" $"+item[1];
    addBox.addEventListener('click', function() {
      extras.push(item);
      price += item[1];
      document.getElementById('burgerTitle').innerHTML = name+" $"+price;
      resetIngr();
    });
    document.getElementById('ingListMinus').appendChild(addBox);
  });
}

//Close the modal on x
var close = document.getElementsByClassName("close")[0];
close.onclick = function() {
  burgerModal.style.display = "none";
  clearLists();
}

//Close modal on background click
window.onclick = function(event) {
  if (event.target == burgerModal) {
      burgerModal.style.display = "none";
      clearLists();
  }
}

function clearLists() {
  document.getElementById('ingListPlus').innerHTML = '';
  document.getElementById('ingListMinus').innerHTML = '';
}
