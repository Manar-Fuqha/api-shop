
const loader = document.querySelector(".loader");
const getProductDeatils=async()=>{
    const productId = new URLSearchParams(window.location.search).get("productId");
    const response = await axios(`https://dummyjson.com/products/${productId}`);
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


const displayAProduct = async()=>{
  loader.classList.remove("d-none");
    const response = await getProductDeatils();
    const productInfo=response.data;
    const result =  `<h2 class="product-title">${productInfo.title}</h2>
                        <p class="desc">${productInfo.description}</p>
                        <span class="d-flex">Price : ${productInfo.price}</span>
                        <span>Stock : ${productInfo.stock}</span>
                        <div class="d-flex ">
                         <div class="stars-outer" data-rating="${productInfo.rating}">
              <div class="stars-inner"></div>
            </div></div>
                        <button class="mt-3 w-25  d-flex justify-content-center btn btn-danger" onclick="deleteProduct(${productInfo.id})">Delete</button>
                        `;
        document.querySelector(".product-info").innerHTML=result;
showStars();
    const images = productInfo.images.map(img=>{
        return `<div class="swiper-slide"><img class="img-fluid d-flex m-auto"  src=${img} alt="This is a ${productInfo.title}"></div>`
    }).join(' ');
    document.querySelector(".swiper-wrapper").innerHTML=images;
    const swiper = new Swiper('.swiper', {
loop: true,
 pagination: {
    el: '.swiper-pagination',
  },
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
   autoplay: {
   delay: 5000,
 },

   slidesPerView: 1,
  spaceBetween: 10,

});


 const reviews = productInfo.reviews.map(review=>{
        return `<div class="swiper-slide ">
        <div class="card">
      <div class="card-body">
        <h5 class="card-title">${review.reviewerName}</h5>
        <p>${review.reviewerEmail}</p>
        <p class="card-text">${review.comment}</p>
      </div>
    </div>
    </div>`
    }).join(' ');
    document.querySelector(".reviews .swiper-wrapper").innerHTML=reviews;
    const reviewsSwiper = new Swiper('.reviews .swiper', {
slidesPerView: "auto",
centeredSlides: true,
  spaceBetween: 10,
  grabCursor: true,
  loop:true,
 pagination: {
    el: '.swiper-pagination',
  },
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
   autoplay: {
   delay: 10000,
 },


});
loader.classList.add("d-none");
}
displayAProduct();


 const deleteProduct =(pId) =>{
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    loader.classList.remove("d-none");
    const response = await axios.delete(`https://dummyjson.com/products/${pId}`);

  if(response.status ==200 && response.data.isDeleted == true){
loader.classList.add("d-none");

      await Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
   location.href = '/index.html';
  }
    
  }
});

}



