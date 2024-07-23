const $result = document.querySelector("#result")
const $createForm = document.querySelector("form")
const $inputs = $createForm.querySelectorAll(".inputElement")

fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products")
.then(response => response.json())
.then(data => renderProducts(data))


const renderProducts  = (data) => {
    data.forEach(product => {
        const $div = document.createElement("div");
        $div.className = "card";
        $div.innerHTML = `
        <img width="300px" src="${product.image}" />
        <h3>${product.title}</h3>
        <p>${product.description.slice(0, 70) + "..."}<p/>
        <strong>$${product.price}</strong>
        <br/>
        <button data-product-id="${product.id}" class="btn">DELETE</button>
        `
        $result.appendChild($div)
    })
}

const handleProductActions = (e) =>{
    if(e.target.classList.contains("btn")){
        const id =  e.target.dataset.productId
        const useragree = confirm("ARE YOU SURE DELETE IS PRODUCT");
        if(useragree){
            fetch(`https://6662ac4162966e20ef097175.mockapi.io/api/products/products/${id}`, {method: "DELETE"})
                    .then(response => response.json())
                    .then(data => console.log(data))
        }
    }
}

const handleCreateNewProduct = (e) => {
      e.preventDefault();

      const values = Array.from($inputs).map(input => input.value)
      let product = {
        name: values[0],
        image: values[1],
        price: values[2],
        description: values[3]
      }

      fetch("https://6662ac4162966e20ef097175.mockapi.io/api/products/products", 
        {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(product)
        }
    )
             .then(response => response.json())
            .then(data => {
                window.location.reload()
            })
}


$result.addEventListener("click", handleProductActions)
$createForm.addEventListener("submit" , handleCreateNewProduct)