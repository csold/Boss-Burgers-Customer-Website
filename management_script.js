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


    //get data from firebase for monthly sales
    var months = [];
    var revenue = [];

    firebase.database().ref().child('archive').child('monthlysales').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnap) {
          months.push(childSnap.key);
          revenue.push(childSnap.val());
        });
        console.log(months + " | " + revenue);
        //build sales by month chart
        var salesChart = document.getElementById('sales_chart').getContext('2d');

        var sales = new Chart(salesChart, {
            type:'line',
            data: {
                labels:months, //THIS IS GETTING THE ARRAY OF MONTHS (NUMBER)//
                datasets:[{
                    label:'Month',
                    data:revenue, //THIS IS GETTING THE ARRAY OF SALES//
                    backgroundColor: 'rgba(54, 162, 235, 1)'
                }]
            },
            options:{
                legend: {
                        position: 'bottom',
                    },
                scales: {
                        yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
    //                                steps: 10,
    //                                stepValue: 5,
    //                                max: 100
                                }
                            }]
                    },
                title: {
                        display: true,
                        text: 'Sales by Month',
                        fontSize: '20'
                    }
            },
        })
    });




    //   data from firebase
    var burgerTypes = [];
    var totals = [];
    firebase.database().ref().child('archive').child('burgerType').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnap) {
          burgerTypes.push(childSnap.key);
          totals.push(childSnap.val());
        });
        console.log(burgerTypes + " | " + totals);
        //build sales by month chart
        var burgerChart = document.getElementById('burger_chart').getContext('2d');

        var burgers = new Chart(burgerChart, {
            type:'bar',
            data: {
                labels:burgerTypes,
                datasets:[{
                    label:'Burger Name',
                    data:totals,
                    backgroundColor: 'rgba(54, 162, 235, 1)',

                }]
            },
            options:{
                legend: {
                        position: 'bottom',
                    },
                scales: {
                        yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
    //                                steps: 10,
    //                                stepValue: 5,
    //                                max: 100
                                }
                            }]
                    },
                title: {
                        display: true,
                        text: 'Number of Sales per Item',
                        fontSize: '20'
                    }
            },
        })
    });
