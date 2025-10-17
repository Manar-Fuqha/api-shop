
const changeNavColor =()=>{
    const navbar = document.querySelector(".navbar");
    const firstSection = document.querySelector(".header h1");
    console.log(firstSection);
    window.addEventListener("scroll",()=>{
        console.log(firstSection.offsetTop);
        if(window.scrollY +navbar.scrollHeight  >= firstSection.offsetTop  ){
            navbar.classList.add("on-scroll");
        }
        else{
            navbar.classList.remove("on-scroll");
        }
    })
}

changeNavColor();