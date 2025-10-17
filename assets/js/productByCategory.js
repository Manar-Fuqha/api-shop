
const loader = document.querySelector(".loader");


const getProductsCategory=async()=>{
    const category = new URLSearchParams(window.location.search).get("category");
    document.querySelector(".title").textContent+=category.toUpperCase();
    document.querySelector('.add-product').innerHTML = `
    <a class="text-decoration-none btn btn-outline-info add-product-link" href="./addProduct.html?category=${category}">Add New Product</a>
    `;
    
    const response = await axios(`https://dummyjson.com/products/category/${category}`)
    console.log(response);
    if(response.status==200)
        return response;
}

const showStars=()=> {
  const maxStars = 5;
  const starContainers = document.querySelectorAll(".stars-outer");

  starContainers.forEach(container => {
    const rating = parseFloat(container.dataset.rating);
    const starPercentage = (rating / maxStars) * 100;
    container.querySelector(".stars-inner").style.width = `${starPercentage}%`;
  });
}


const displayProductsCategory =async()=>{
    loader.classList.remove("d-none");
    const response = await getProductsCategory();

    const result = response.data.products.map(product=>{
        return `
        
        <div class="col"> <div class="card h-100" >
                    <img src="${product.thumbnail}" class="card-img-top img-fluid" alt="..." >
                    <div class="card-body d-flex flex-column" >
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <div class="info d-flex justify-content-between pb-3">
                            <span>${product.price}$</span>
                            <div class="stars-outer" data-rating="${product.rating}">
              <div class="stars-inner"></div>
            </div>
                        </div>
                        
                        <a href="./productDetails.html?productId=${product.id}" class="btn btn-primary d-flex justify-content-center mt-2 mt-auto">See Product</a>
                    </div>
                </div>
                </div>`
    }).join(' ');
    document.querySelector(".get-products").innerHTML=result;
    showStars();
    loader.classList.add("d-none");
}

displayProductsCategory();


