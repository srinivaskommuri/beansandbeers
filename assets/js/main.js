(function() {
	"use strict";

    //Preloader
    window.addEventListener('load',function(){
        document.querySelector('body').classList.add("loaded")  
    });

    window.onload = function(){

        //Header Sticky
        const getHeaderId = document.querySelector(".navbar-area");
        if (getHeaderId) {
            window.addEventListener('scroll', event => {
                const height = 150;
                const { scrollTop } = event.target.scrollingElement;
                document.querySelector('#navbar').classList.toggle('sticky', scrollTop >= height);
            });
        }
        
        // Back to Top
        const getId = document.getElementById("backtotop");
        if (getId) {
            const topbutton = document.getElementById("backtotop");
            topbutton.onclick = function (e) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            };
            window.onscroll = function () {
                if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                    topbutton.style.opacity = "1";
                } else {
                    topbutton.style.opacity = "0";
                }
            };
        }
    };

    //Testimonial Slider
    var swiper = new Swiper(".testimonial-slider-one", {
        spaceBetween: 25,
        grabCursor: true,
        loop: true,
        autoHeight: true,
        fadeEffect: { crossFade: true },
        virtualTranslate: true,
        effect:"fade",
        speed:1400,
        navigation: {
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
        }
    });
    var swiper = new Swiper(".testimonial-slider-two", {
        spaceBetween: 25,
        grabCursor: true,
        loop: true,
        autoHeight: true,
        fadeEffect: { crossFade: true },
        virtualTranslate: true,
        effect:"fade",
        navigation: {
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
        },
        speed:1400,
    });

    //Promo-slider 
    var swiper = new Swiper(".promo-slider", {
        spaceBetween: 0,
        grabCursor: true,
        loop: true,
        autoHeight: true,
        speed:1400,
        breakpoints: {
            0: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 1.8
            },
            992: {
                slidesPerView: 1.2
            },
            1200: {
                slidesPerView: 1.6,
            },
            1400: {
                slidesPerView: 2.2,
            },
            1600: {
                slidesPerView: 2.3,
            }
        },
    });

    //Team Slider
    var swiper = new Swiper(".team-slider", {
        spaceBetween: 25,
        grabCursor: true,
        loop: true,
        autoHeight: true,
        navigation: {
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
        },
        speed:1400,
        breakpoints: {
            0: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 35,
            }
        },
    });
    
    // Counter Js
    if ("IntersectionObserver" in window) {
        let counterObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                let counter = entry.target;
                let target = parseInt(counter.innerText);
                let step = target / 200;
                let current = 0;
                let timer = setInterval(function () {
                    current += step;
                    counter.innerText = Math.floor(current);
                    if (parseInt(counter.innerText) >= target) {
                    clearInterval(timer);
                    }
                }, 10);
                counterObserver.unobserve(counter);
                }
            });
        });
        let counters = document.querySelectorAll(".counter");
            counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // Quantity Counter
    var resultEl = document.querySelector(".resultSet"),
    plusMinusWidgets = document.querySelectorAll(".v-counter");
    for (var i = 0; i < plusMinusWidgets.length; i++) {
        plusMinusWidgets[i].querySelector(".minusBtn").addEventListener("click", clickHandler);
        plusMinusWidgets[i].querySelector(".plusBtn").addEventListener("click", clickHandler);
    }
    function clickHandler(event) {
        // reference to the count input field
        var countEl = event.target.parentNode.querySelector(".count");
        if (event.target.className.match(/\bminusBtn\b/)) {
             countEl.value = Number(countEl.value) - 1;
        } else if (event.target.className.match(/\bplusBtn\b/)) {
             countEl.value = Number(countEl.value) + 1;
        }
        triggerEvent(countEl, "change");
    };
    function triggerEvent(el, type){
        if ('createEvent' in document) {
            // modern browsers, IE9+
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            // IE 8
            var e = document.createEventObject();
            e.eventType = type;
            el.fireEvent('on'+e.eventType, e);
        }
    }
    function triggerEvent(el, type){
        if('createEvent' in document) {
            // modern browsers, IE9+
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            // IE 8
            var e = document.createEventObject();
            e.eventType = type;
            el.fireEvent('on'+e.eventType, e);
        }
    }
    
    // Scrollcue
    scrollCue.init();

})();
 
    // Offcanvas Responsive Menu
    const list = document.querySelectorAll('.responsive-menu-list');
    function accordion(e) {
        e.stopPropagation(); 
        if(this.classList.contains('active')){
            this.classList.remove('active');
        }
        else if(this.parentElement.parentElement.classList.contains('active')){
            this.classList.add('active');
        }
        else {
            for(i=0; i < list.length; i++){
                list[i].classList.remove('active');
            }
            this.classList.add('active');
        }
    }
    for(i = 0; i < list.length; i++ ){
        list[i].addEventListener('click', accordion);
    }

try {

    // function to set a given theme/color-scheme
	function setTheme(themeName) {
		localStorage.setItem('etar_theme', themeName);
		document.documentElement.className = themeName;
	}
	// function to toggle between light and dark theme
	function toggleTheme() {
		if (localStorage.getItem('etar_theme') === 'theme-dark') {
			setTheme('theme-light');
		} else {
			setTheme('theme-dark');
		}
	}
	// Immediately invoked function to set the theme on initial load
	(function () {
		if (localStorage.getItem('etar_theme') === 'theme-dark') {
			setTheme('theme-dark');
			document.querySelector('.slider-btn').checked = false;
		} else {
			setTheme('theme-light');
		document.querySelector('.slider-btn').checked = true;
		}
	})();

} catch (err) {}