
const loader = document.querySelector(".loader");
const getCategories=async()=>{
    const response = await axios("https://dummyjson.com/products/category-list");
    console.log(response);
    if(response.status ==200)
        return response;
}

const displayCategories =async()=>{
    loader.classList.remove("d-none");
const response = await getCategories();

const result = response.data.map((category)=>{
   
    return `<a href="./productByCategory.html?category=${category}" class="category fw-semibold list-group-item border text-center border-secondary-subtle py-3">${category.toUpperCase()}</a>`
}).join(' ');
document.querySelector(".categories-list").innerHTML=result;
loader.classList.add("d-none");
}

displayCategories();