const $loginForm = document.querySelector("#login-form")
const $inputs = $loginForm.querySelectorAll("input")


const handleUserLogin = (e) => {
    e.preventDefault();
    const values = Array.from($inputs).map(input => input.value)
    const  user = {
            email: values[0],
            password: values[1],
          
    }

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })

    .then(response => response.json())
    .then(data =>  {
        if(data.access_token){
            localStorage.setItem("token" , data.access_token)
            location.replace(window.origin + "/index.html")
        }
    })
}


$loginForm.addEventListener("submit" , handleUserLogin)