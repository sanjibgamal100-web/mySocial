// ================================
// MySocial - Main JavaScript
// ================================


// Get saved user
function getUser() {
    const user = localStorage.getItem("mySocialUser");

    if (user) {
        return JSON.parse(user);
    }

    return null;
}


// Save user
function saveUser(user) {
    localStorage.setItem(
        "mySocialUser",
        JSON.stringify(user)
    );
}


// ================================
// REGISTER
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const username =
            document.getElementById("registerUsername").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        // Create user
        const user = {

            name: name,

            username: username,

            email: email,

            password: password,

            bio: "Welcome to my profile!",

            balance: 0

        };


        saveUser(user);


        alert("Registration successful!");


        // Go to login
        window.location.href = "index.html";

    });

}


// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const user = getUser();


        // Check user
        if (!user) {

            alert("No account found. Please register first.");

            return;
        }


        // Check username and password
        if (
            username === user.username &&
            password === user.password
        ) {

            localStorage.setItem(
                "mySocialLoggedIn",
                "true"
            );

            alert("Login successful!");


            // Go to home
            window.location.href = "home.html";

        } else {

            alert("Incorrect username or password.");

        }

    });

}


// ================================
// PROFILE
// ================================

function loadProfile() {

    const user = getUser();

    if (!user) {
        return;
    }


    const profileName =
        document.getElementById("profileName");

    const profileUsername =
        document.getElementById("profileUsername");

    const profileBio =
        document.getElementById("profileBio");

    const profileBalance =
        document.getElementById("profileBalance");

    const infoUsername =
        document.getElementById("infoUsername");

    const profileEmail =
        document.getElementById("profileEmail");


    if (profileName) {
        profileName.textContent = user.name;
    }

    if (profileUsername) {
        profileUsername.textContent =
            "@" + user.username;
    }

    if (profileBio) {
        profileBio.textContent = user.bio;
    }

    if (profileBalance) {
        profileBalance.textContent =
            user.balance;
    }

    if (infoUsername) {
        infoUsername.textContent =
            user.username;
    }

    if (profileEmail) {
        profileEmail.textContent =
            user.email;
    }

}


// Load profile automatically
loadProfile();


// ================================
// RECHARGE
// ================================

function selectAmount(amount) {

    const amountInput =
        document.getElementById("amount");

    if (amountInput) {

        amountInput.value = amount;

    }

}


const rechargeForm =
    document.getElementById("rechargeForm");


if (rechargeForm) {

    const user = getUser();


    // Show current balance
    if (user) {

        const currentBalance =
            document.getElementById("currentBalance");

        if (currentBalance) {

            currentBalance.textContent =
                user.balance;

        }

    }


    rechargeForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const amount =
                Number(
                    document.getElementById("amount").value
                );


            if (amount <= 0 || isNaN(amount)) {

                alert("Please enter a valid amount.");

                return;
            }


            const currentUser = getUser();


            if (!currentUser) {

                alert("Please register first.");

                return;
            }


            // Add balance
            currentUser.balance += amount;


            // Save updated user
            saveUser(currentUser);


            // Show message
            const message =
                document.getElementById("rechargeMessage");


            if (message) {

                message.textContent =
                    "Recharge successful! Added Rs. " + amount;

            }


            // Update displayed balance
            const currentBalance =
                document.getElementById("currentBalance");


            if (currentBalance) {

                currentBalance.textContent =
                    currentUser.balance;

            }


            // Clear input
            document.getElementById("amount").value = "";

        }
    );

}


// ================================
// CREATE POST
// ================================

function createPost() {

    const postText =
        document.getElementById("postText");


    if (!postText) {
        return;
    }


    const text =
        postText.value.trim();


    if (text === "") {

        alert("Please write something first.");

        return;
    }


    const posts =
        document.getElementById("posts");


    const post =
        document.createElement("div");


    post.className = "post";


    post.innerHTML = `

        <h3>My Post</h3>

        <p>${text}</p>

        <small>Just now</small>

    `;


    posts.prepend(post);


    // Clear textarea
    postText.value = "";

}