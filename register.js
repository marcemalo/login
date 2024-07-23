const $registerForm = document.querySelector("#register-form")
const $inputs = $registerForm.querySelectorAll("input")


const handleUserRegister = (e) => {
    e.preventDefault();
    
    const values = Array.from($inputs).map(input => input.value)
    console.log(values)
    const  user = {
        
            name: values[0],
            email: values[1],
            password: values[2],
            avatar: values[3],
          
    }

    fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    })

    .then(response => response.json())
    .then(data =>  {
        if(data.id){
            location.replace(location.origin + "/pages/login.html")
        }
    })
}




$registerForm.addEventListener("submit" , handleUserRegister)