let userData = {
}

const loginUserNameBox = document.getElementById("username");
const loginPassBox = document.getElementById("password");

const registerEmailBox = document.getElementById("email");
const registerEmailAppBox = document.getElementById("emailapprove");
const registerPasswordBox = document.getElementById("regpass");
const registerUsernameBox = document.getElementById("reguser");

window.addEventListener("load", loadLocal());

function redirectToReg() {
    window.location.href = "register.html";
}

function saveLocal() {
    const dataJson = JSON.stringify(userData);
    localStorage.setItem("userArray", dataJson)
}

function loadLocal() {
    const localData = localStorage.getItem("userArray")
    
    if (localData == null) {
        return;
    }

    userData = JSON.parse(localData);
}

function validateUser() {
    for (const user in userData) {
        if ((userData[user]["email"] == loginUserNameBox.value || userData[user]["username"] == loginUserNameBox.value) && userData[user]["password"] == loginPassBox.value) {
            window.alert("Erfolgreich angemeldet")
            const prevUrl = document.referrer;
            window.location.href = prevUrl;
        } else {
            window.alert("Daten stimmen nicht überein.")
            window.location.href = "login.html";
        }
    }
}

function registrateUser() {
    const newEmail = registerEmailBox.value;
    const emailAppr = registerEmailAppBox.value;
    const newPass = registerPasswordBox.value;
    const newUser = registerUsernameBox.value;

    if (newEmail == "" || emailAppr == "" || newPass == "" || newUser == "") {
        window.alert("Bitte alle felder ausfüllen.");
        return;
    }

    if (newEmail != emailAppr) {
        window.alert("Given E-Mails don't match")
        return;
    }

    if (checkEmailExists(newEmail)) {
        window.alert("Email already exists. Please try again")
        return
    }

    if (checkUserExists(newUser)) {
        window.alert("Username already exists. Please try again")
        return
    }

    const rID = createRandomId()
    userData[rID] = {
        "email": newEmail,
        "username": newUser,
        "password": newPass
    }
    
    console.log(userData)
    saveLocal()

    
    const prevUrl = document.referrer
    window.location.replace = prevUrl;
}

function createRandomId() {
    //generates random id;
    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    const rID = guid()
    if (checkIdDB(rID)) {
        saveIdLocal(rID);
        return rID;
    } else {
        return createRandomId();
    }
    //"c2181edf-041b-0a61-3651-79d671fa3db7"
}

function saveIdLocal(id) {
    const localIdArr = localStorage.getItem("spotifyIDS");

    if (localIdArr == null) {
        const newIDArr = [];
        newIDArr.push(id);

        const jsonArr = JSON.stringify(newIDArr);
        localStorage.setItem("spotifyIDS", jsonArr);
    } else {
        const localArr = JSON.parse(localIdArr);
        localArr.push(id);

        const jsonArr = JSON.stringify(localArr);
        localStorage.setItem("spotifyIDS", jsonArr);
    }
}

function checkIdDB(newId) {
    if (searchUser(newId, Object.keys(userData))) {
        return false;
    } else {
        return true;
    }
}

function checkEmailExists(email) {
    for (const userID in userData) {
        if (userData[userID]["email"] == email) {
            return true;
        }
    }

    return false;
}

function checkUserExists(user) {
    for (const userID in userData) {
        if (userData[userID]["username"] == user) {
            return true;
        }
    }

    return false;
}

function searchUser(value, list) {
    for (const listid in list) {
        if (list[listid] == value) {
            return true;
        }
    }
    return false;
}

function helper(rID) {
    if (checkIdDB(rID)) {
        saveIdLocal(rID);
        return rID;
    } else {
        return createRandomId();
    }
}


    /*
    let low = 0;    //left endpoint
    let high = list.length - 1;   //right endpoint
    let position = -1;
    let found = false;
    let mid;
  
    while (found === false && low <= high) {
        mid = Math.floor((low + high)/2);
        if (list[mid] == value) {
            found = true;
            position = mid;
        } else if (list[mid] > value) {  //if in lower half
            high = mid - 1;
        } else {  //in in upper half
            low = mid + 1;
        }
    }
    return found;
    */