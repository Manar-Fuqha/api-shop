const loader = document.querySelector(".loader");
const getProducts =async(page )=>{
    const skip = (page-1)*8;
    
    const response = await axios(`https://dummyjson.com/products?limit=8&skip=${skip}`);
    console.log(response);
    if(response.status==200)
        return response;
}

const displayProducts =async( page=1)=>{
    loader.classList.remove("d-none");
    const response = await getProducts(page );

    const totalCount = response.data.total;
    const numberOfPages = Math.ceil(totalCount / 8);
  const showStars=()=> {
  const maxStars = 5;
  const starContainers = document.querySelectorAll(".stars-outer");

  starContainers.forEach(container => {
    const rating = parseFloat(container.dataset.rating);
    const starPercentage = (rating / maxStars) * 100;
    container.querySelector(".stars-inner").style.width = `${starPercentage}%`;
  });
}
    const result = response.data.products.map(product=>{
        
        return `
        <div class="col"> <div class="card h-100" >
                    <img src="${product.thumbnail}" class="card-img-top img-fluid" alt="this is a ${product.title}" >
                    <div class="card-body d-flex flex-column" >
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <div class="info d-flex justify-content-between pb-3">
                            <span class="product-price fw-semibold">${product.price}$</span>
                            <div class="stars-outer " data-rating="${product.rating}">
              <div class="stars-inner"></div>
            </div>
                            
                        </div>
                        
                        <a href="./productDetails.html?productId=${product.id}" class="btn btn-primary d-flex justify-content-center mt-2 mt-auto">See Product</a>
                    </div>
                </div>
                </div>`
    }).join(' ');
    document.querySelector(".get-products").innerHTML=result ;
showStars();

    let paginationList = ``;
    paginationList+=`
    <li class="page-item ">
    <button class="page-link ${page<=1 ?"disabled":""}" onclick="displayProducts(${page-1})">Previous</button>
    </li>`

    for(let i=1;i<=numberOfPages;i++){
        if(i==1 || i==numberOfPages ||(i> page-2 && i<page+2)){
            paginationList+=`
    <li class="page-item ">
    <button class="page-link ${i==page?"active":""}" onclick="displayProducts(${i})">${i}</button>
    </li>`
        }
        else if(i==2 && page>3){
            paginationList+=`
    <li class="page-item ">
    <button class="page-link disabled" >...</button>
    </li>`
        }
        else if(i==numberOfPages-1 && page < numberOfPages - 2){
            paginationList+=`
    <li class="page-item ">
    <button class="page-link disabled" >...</button>
    </li>`
        }
    }

paginationList+=`
    <li class="page-item ">
    <button class="page-link ${page>=numberOfPages ?"disabled":""}" onclick="displayProducts(${parseInt(page)+1})">Next</button>
    </li>`


    document.querySelector(".pagination").innerHTML=paginationList;
loader.classList.add("d-none");
}

displayProducts();


