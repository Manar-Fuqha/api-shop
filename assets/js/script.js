

const loader = document.querySelector(".loader");

const showStars=()=> {
  const maxStars = 5;
  const starContainers = document.querySelectorAll(".stars-outer");

  starContainers.forEach(container => {
    const rating = parseFloat(container.dataset.rating);
    const starPercentage = (rating / maxStars) * 100;
    container.querySelector(".stars-inner").style.width = `${starPercentage}%`;
  });
}


const navLinks = Array.from(document.querySelectorAll(".nav-link"));

navLinks.forEach(link=>{

    link.addEventListener("click", ()=>{

        navLinks.forEach( (navlink)=>{
            navlink.classList.remove("active", "fw-semibold");
        })
        
        link.classList.add("active","fw-semibold");
    });
}) ;

const getCategories=async()=>{
    const response = await axios("https://dummyjson.com/products/category-list");
    console.log(response);
    if(response.status ==200)
        return response;
}

const displayCategories =async()=>{
    loader.classList.remove("d-none");
const response = await getCategories();

const result = response.data.map((category,index)=>{
    console.log("index="+index);
    if(index>=7)return ;
    return `<a href="./productByCategory.html?category=${category}" class="list-group-item border text-center border-secondary-subtle py-3">${category.toUpperCase()}</a>`
}).join(' ');
document.querySelector(".categories-list").innerHTML=result+ `<a class="mb-3 fw-bold text-decoration-none  pt-3 mt-auto" style="color : #2e7376" href="./categories.html">Browse All Categories</a>`;
loader.classList.add("d-none");
}

displayCategories(); 

const getProducts =async()=>{
    const response = await axios(`https://dummyjson.com/products?limit=10`);
    console.log(response);
    if(response.status==200)
        return response;
}

const displayProducts =async()=>{
    loader.classList.remove("d-none");
    const response = await getProducts();

    const result = response.data.products.map(product=>{
        
        return `
        <div class="col"> <div class="card h-100" >
                    <img src="${product.thumbnail}" class="card-img-top img-fluid" alt="..." >
                    <div class="card-body d-flex flex-column" >
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <div class="info d-flex justify-content-between pb-3">
                            <span class="product-price fw-semibold" >${product.price}$</span>
                            <div class="stars-outer" data-rating="${product.rating}">
              <div class="stars-inner"></div>
            </div>
                        </div>
                        
                        <a href="./productDetails.html?productId=${product.id}" class="btn btn-primary d-flex justify-content-center mt-2 mt-auto">See Product</a>
                    </div>
                </div>
                </div>`
    }).join(' ');
    document.querySelector(".get-products").innerHTML=result + `<a class="mb-3 fw-bold text-decoration-none  pt-3 mt-auto" style="color : #2e7376" href="./products.html">Browse All Products</a>`;
showStars();
    loader.classList.add("d-none");
}

displayProducts();