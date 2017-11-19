(function() {
    
    // Initialize Firebase
        const config = {
        apiKey: "AIzaSyAB6Gedku794rF0vZzLOeOr0QFyOXzgOGM",
        authDomain: "boss-burgers.firebaseapp.com",
        databaseURL: "https://boss-burgers.firebaseio.com",
        projectId: "boss-burgers",
        storageBucket: "boss-burgers.appspot.com",
        messagingSenderId: "415437985852"
        };
    
     firebase.initializeApp(config);

    //get elements
    const txtEmail = document.getElementById('username');
    const txtPassword = document.getElementById('password');
    const btnLogin = document.getElementById('login');
    
    //button listener
    btnLogin.addEventListener('click', e=> {
        //get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        
        //sign in   
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => {
                      console.log(e.message);
                     alert("Incorrect username or password");
                    }
        );
        
        //realtime listerner
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log(firebaseUser);
                if(firebaseUser.uid=='9QH1RfErPVaylEFen4lMzOKooEt1'){
                    window.location.href = "management.html";
                }
                if(firebaseUser.uid=='HNshUYJeMfQD0oDiGH4PmIbI7Af1'){
                    window.location.href = "kitchen.html";
                }
                
            } 

        })
        
    })

            
    
    
   
    
}());
