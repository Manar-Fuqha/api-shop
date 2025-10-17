  const loader = document.querySelector(".loader");
  
  const category = new URLSearchParams(window.location.search).get("category");
    document.querySelector(".title").textContent+=category.toUpperCase();
const addForm = document.forms['add-product-form'];
console.log(addForm);

 addForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    loader.classList.remove("d-none");
    const response = await axios.post(`https://dummyjson.com/products/add`,{
        
        title: addForm.title.value,
        description: addForm.description.value,
        brand :addForm.brand.value,
        price:addForm.price.value,
        stock: addForm.stock.value,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if(response.status ==201){
      loader.classList.add("d-none");
        Swal.fire({
        title: "Added Successfully",
        icon: "success",
        draggable: true
        });
        location.href = './index.html';
    }
    addForm.reset();
    
})