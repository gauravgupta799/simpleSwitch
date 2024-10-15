// const html = document.getElementsByTagName("html");
const body = document.querySelector(".body");
const header = document.querySelector(".header-desktop");
const hamburgerBtn = document.getElementById("hamburger-btn");
const scrollingHeader = document.querySelector(".header");


gsap.registerPlugin(ScrollTrigger);

// Lenis Imported
const lenis = new Lenis({
    duration: 1,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scroll = value
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
})
  
ScrollTrigger.defaults({ scroller: document.body })


let isOpened = false;
function stopLenisScroll(){
    isOpened = !isOpened;
    isOpened ? lenis.stop() : lenis.start();
}

// ====== Toggle Header On Scroll Start =======
let prevScrollPos = lenis.scroll;
function toggleHeader() {
    let scrollTop = lenis.scrollY || document.documentElement.scrollTop;
    if(scrollTop  > prevScrollPos){
        scrollingHeader.classList.add("hidden");
    }else{
        scrollTop === 0 ?  header.classList.remove("sticky") : header.classList.add("sticky");
        scrollingHeader.classList.remove("hidden");
    }
    prevScrollPos = scrollTop <= 0 ? 0 : scrollTop;;
}
//======= Sticky Header End ===========

lenis.on('scroll', (e) => {
    toggleHeader();
});


function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// ----=== Loader Start ----=========
window.onload = function(){
    const tl = gsap.timeline({
        defaults:{
            opacity:0,
            duration:1,
            ease:"power3.out"
        }
    });

    const loader = document.querySelector(".loader-container");
    if(loader){
        loader.style.display = "none"; 
    }
    tl.fromTo(".header",
        { opacity:0,},
        { opacity:1,}
    )

    tl.from(".header__logo", {
        duration:1.25,
        delay:-1,
    })
    .from(".nav__link", {
        y:20,
        stagger:0.01,
        delay:-1.15,
    })
    .from(".header-btn", {
        y:20,
        delay:-1.25,
    })
    .from(".hero__title", {
        y:50,
        delay:-1.3,
    })
    .from(".hero__subTitle", {
        y:50,
        delay:-1.35,
    })
    const heroBtn = document.querySelectorAll(".hero-btn");
    if(heroBtn){
        tl.from(heroBtn, {
            y:50,
            duration:1.2,
            stagger:0.1,
            delay:-1.4,
        });
    }
}
// ----=== Loader End ----=========


//====== Active Page Link Start ======
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".nav__link");
const mobileNavLinks = document.querySelectorAll(".mobile-menu__link");

function activeLink(link) {
    // const linkPathname = new URL(link.href).pathname;
    const linkPathname = new URL(link.href, window.location.origin).pathname;
    if((windowPathname === linkPathname) || (windowPathname === "./index.html" && linkPathname === "/")){
        link.classList.add("active");
    }
}

navLinks && navLinks.forEach((navLink) => {
    activeLink(navLink);
});

mobileNavLinks && mobileNavLinks.forEach((navLink) => {
    activeLink(navLink);
});
//====== Active Page Link End ======



// ======== Toggle Function for Accordion and Submenu Start ========
function toggleContent(items, contentSelector) {
    items.forEach((item) => {
        item.addEventListener("click", function() {
            const content = this.querySelector(contentSelector) || this.nextElementSibling;
            this.classList.toggle("active");

            if(content){
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
                if(content.querySelector("p")){
                    gsap.fromTo(content.querySelector("p"),
                        {
                            opacity: 0,
                            y: 50,
                        },
                        {
                            opacity: 1,
                            y: 1,
                            duration: 1,
                            ease: "power3.out",
                        }
                    );
                }
            }

            items.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    const otherContent = otherItem.querySelector(contentSelector) || otherItem.nextElementSibling;
                    if (otherContent) otherContent.style.maxHeight = null;
                }
            });
        });
    });
}


// ---------- Accordion Start --------
const accordions = document.querySelectorAll(".accordion__title-wrapper");
accordions && toggleContent(accordions);

// ---------- Mobile SubMenu Start --------
let mobileSubmenu = document.querySelectorAll(".mobile-submenu");
mobileSubmenu && toggleContent(mobileSubmenu, '.subMenu__list--mobile');

// ======== Toggle Function for Accordion and Submenu End ========



//====== Toggle Mobile Menu Start ==========
function toggleMobileMenu(){
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("is-open");
    stopLenisScroll();
}

if(hamburgerBtn){
    hamburgerBtn.onclick = toggleMobileMenu;
    const closeMenuBtn = document.getElementById("close-menu-btn");
    closeMenuBtn.onclick = toggleMobileMenu;
}
//====== Toggle Mobile Menu End ==========


// ============ Swipers Start =================
var swiper1 = new Swiper(".swiper-testimonials", {
    slidesPerView: 1,
    navigation: {
        prevEl: "#swiper-prev-btn",
        nextEl: "#swiper-next-btn",
    },
    // loop:true,
    grabCursor:true,
    spaceBetween:20,
    breakpoints:{
        576:{
            slidesPerView:2,
        },
        768:{
            slidesPerView:3,
            // spaceBetween:30,
        },
    }
});

// const stayConntected = new Swiper(".stay-connected-swiper", {
//     slidesPerView: 1,
//     loop:true,
//     grabCursor:true,
//     spaceBetween:20,
//     breakpoints:{
//         768:{
//             slidesPerView:3
//         },
//         1024:{
//             slidesPerView:3
//         },
//         1200:{
//             slidesPerView:4
//         }
//     }
// })
// ============ Swipers End =================



// ========== Counter script start ============
// const counterSections = document.querySelectorAll(".counter-section");
// counterSections && counterSections.forEach((counterSection)=>{
//     const counters = counterSection.querySelectorAll(".count-value");
//     if(counters.length > 0) {
//         let CounterObserver = new IntersectionObserver(
//             (entries, observer)=>{
//                 let [entry] = entries;
//                 if(!entry.isIntersecting) return;
        
//                 let speed = 200;
//                 counters.forEach((counter, index) => {
//                     const updateCounter = () =>{
//                         let targetNumber = +counter.dataset.target;
//                         let initialNumber = +counter.innerText;
//                         let incPerCount = targetNumber / speed;
//                         if(initialNumber  < targetNumber ){
//                             counter.innerText = Math.ceil(initialNumber + incPerCount);
//                             setTimeout(updateCounter, 40);
//                         }
//                     }
//                     updateCounter();
//                 })
//                 observer.unobserve(counterSection);
//             },{
//                 root:null,
//                 threshold:0.4,
//             }
//         );
//         CounterObserver.observe(counterSection);
//     }
// })
// ============ Counter script end ============

//========== Video Play /Pause Button Start ============
const playBtns = document.querySelectorAll(".play-btn-wrapper");
if(playBtns){
  const videoContainer = document.querySelector(".video__popup-container");
  const closeBtn = document.querySelector(".video__popup-close");
  let iframe = document.querySelector(".video__popup-iframe-container > iframe");

  function togglePopup() {
    videoContainer.classList.toggle("show");
    gsap.fromTo(".video__popup-wrapper", 0.5,
      { opacity:0, y:50},
      { opacity:1, y:0, ease:Power4.easeOut }
    );
    stopLenisScroll();
  }

  playBtns.forEach((playBtn, index) => {
    playBtn.addEventListener("click",() => {
      const videoId = playBtn.dataset.id;
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      togglePopup();
    })
  });

  closeBtn && closeBtn.addEventListener("click", ()=>{
    iframe.src = "";
    togglePopup();
  });
}
//========== Video Play /Pause Button End ============

// ========= Animation Starts =========
//----- animation fade in ------ 
const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
    const anim = gsap.fromTo(mainContent,
        { opacity: 0 },
        { opacity: 1, duration: 1, }
    );
    ScrollTrigger.create({
        trigger: mainContent,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1,
        stagger:0.1,
        ease: "power3.in"
    });
});

//----- animate fade in up ------
const fadeInUp = gsap.utils.toArray(".fade-in-up");
fadeInUp.forEach((item, i) => {
    const anim = gsap.fromTo(item,
        { opacity: 0, y: 60},
        { opacity: 1, y: 0, duration: 1.1, }
    );
    ScrollTrigger.create({
        trigger: item,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.1,
        stagger:0.1,
        ease: "power3.out"
    });
});


const imgReveal = gsap.utils.toArray(".img-reveal");
imgReveal.forEach((item, i) => {
    const anim = gsap.fromTo(item,
        { opacity: 0, scale:1.4, rotation:15},
        { opacity: 1, scale:1, rotation:0, duration: 1.2, }
    );
    ScrollTrigger.create({
        trigger: item,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.2,
        stagger:0.1,
        ease: "power3.out"
    });
});



// Animate Dividers
function animateDividers(selector) {
    const dividers = gsap.utils.toArray(selector);
    dividers.forEach((divider) => {
        const anim = gsap.fromTo(divider,
            { opacity: 0, width:"0"},
            { opacity: 1, width:"100%", duration: 1, ease:"power3.inOut" }
        );
        ScrollTrigger.create({
            trigger: divider,
            animation: anim,
            toggleActions:"play",
            once: true,
            duration:1,
            stagger:1,
            ease:"power3.inOut"
        });
    });
}

// Animate the different dividers
animateDividers(".divider");
animateDividers(".divider--secondary");


// Navbar Items Animations
const menuHamburgerBtn = document.querySelector(".hamburger-wrapper");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);


menuHamburgerBtn.onclick = function(){
   gsap.fromTo(".mobile-menu", 
        {
            opacity:0,
            x:"-100%",
        },{
            opacity:1,
            x:0,
            duration:0.2,
            ease:"power4.inOut"
        }
    );

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
            {
                opacity:0,
                y:60,
                rotation:7,
            },{
                opacity:1,
                y:0,
                duration:1.25,
                stagger:0.75,
                rotation:0,
                ease:"power3.inOut"
            }
        )
    });

    gsap.fromTo(".dropdown-icon",
        {
            opacity:0,
            y:100,
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.15,
            ease:"power4.inOut"
        }
    );

    gsap.from(".footer__link-title",{
        opacity:0,
        y:50,
        duration:0.95,
        rotation:7,
        delay:0.25,
        ease:"power3.inOut"
    })
    gsap.fromTo(".footer__list-item", 
        {
            opacity:0,
            y:50, 
            rotation:7,       
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.25,
            delay:0.35,
            rotation:0,
            ease:"power3.inOut"
        }
    )
    gsap.fromTo(".socials-link", 
        {
            opacity:0,
            y:50,
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.1,
            delay:0.2,
            ease:"power3.inOut"
        }
    )

    stopLenisScroll();
}

closeMenuBtn.onclick = function(){
    gsap.fromTo(".dropdown-icon",
        {
            opacity:1,
            y:0,
        },
        {
            opacity:0,
            y:100,
            duration:1,
            stagger:0.15,
            ease:"power4.inOut"
        },
    )

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
            {
                opacity:1,
                y:0,  
            },{
                opacity:0,
                y:60,
                duration:1.25,
                stagger:0.75,
                rotation:7,
                ease:"power3.inOut"
            }
        )
    })
    gsap.fromTo(".mobile-menu", 
        {
            opacity:1,
            x:0,  
        },{
            opacity:0,
            x:"-100%",
            duration:0.2,
            ease:"power4.inOut"
        }
    );
    stopLenisScroll();  
}

const update = (time, deltaTime, frame) => {
    lenis.raf(time * 1000)
}

gsap.ticker.add(update);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update()
});

//  gsap.ticker.lagSmoothing(0);