const navToggle = document.getElementById("nav__toggle");
const navLists = document.getElementById("nav__lists");
const NavBurgerLines = document.getElementById("nav__burger-lines");
const navItems =  document.querySelectorAll(".nav__item");
const header = document.getElementById("header");

window.onscroll = function () {scrollFunction()};

window.addEventListener('resize' , function() {
    console.log(window.innerWidth);
    if(window.innerWidth > 500) {
        navLists.classList.remove("nav__lists--visible");
        NavBurgerLines.classList.remove("nav--open");
    }
    
});

navToggle.addEventListener("click", toggleMenu);
navItems.forEach(navItem => {
    navItem.addEventListener("click", toggleMenu);
});


function toggleMenu(){
    navLists.classList.toggle("nav__lists--visible");
    NavBurgerLines.classList.toggle("nav--open");
};



function scrollFunction() {
  // console.log(window.innerWidth);

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.style.backgroundColor = "hsl(240, 2%, 92%)";
        header.style.padding = "24px 0";
          
    }else {
        
        if(window.innerWidth > 500) {
            header.style.backgroundColor = "transparent";
            header.style.padding = "64px 0px 53px"; 
        }else {
            header.style.backgroundColor = "hsl(0, 100%, 100%)";
            header.style.padding = "24px 0";
        }
    }
};





