(function() {

    var config = {
      apiKey: "AIzaSyAB6Gedku794rF0vZzLOeOr0QFyOXzgOGM",
      authDomain: "boss-burgers.firebaseapp.com",
      databaseURL: "https://boss-burgers.firebaseio.com",
      projectId: "boss-burgers",
      storageBucket: "boss-burgers.appspot.com",
      messagingSenderId: "415437985852"
    };
    
    firebase.initializeApp(config);

    var auth = firebase.auth();
        
    var btn = document.getElementById("reset");
         
        btn.addEventListener('click', e=> {

        var email = document.getElementById('resetemail').value;
         
        auth.sendPasswordResetEmail(email).then(function() {
        }).catch(function(error) {
        });

            alert("Email has been sent. Check your inbox to reset your password");
            
        })

}());