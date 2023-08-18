function init(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".container"),
      smooth: 3
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".container", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
init();
// gsap.registerPlugin(ScrollTrigger);
window.addEventListener('scroll', reveal);
    function reveal(){
        var reveals = document.querySelectorAll('.reveal');
        for(var i =0; i<reveals.length; i++){
            var windowHeight = window.innerHeight;
            var revealTop = reveals[i].getBoundingClientRect().top;
            var revealPoint = 500;
            if(revealTop<windowHeight - revealPoint){
                reveals[i].classList.add('active');
            }
            else{
                reveals[i].classList.remove('active');
    
            }
        }
    }

function onMouseMove(){
    window.addEventListener('mousemove',dets=>{
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
        // document.querySelector("#cursorBlur").style.transform = `translate(${dets.x}px,${dets.y}px)`

    })
}
function onBodyLoad(){
    if(localStorage.getItem('serviceName')){
        var nameOfService = localStorage.getItem('serviceName');
        document.querySelector(`#service_name option[value="${nameOfService}"]`).setAttribute('selected','true');
    }
    else{
        console.log("no service found")
    }
}

var tlV = gsap.timeline({
    scrollTrigger:{
        trigger:"#section1 video",
        scroller:".container",
        // markers:true,
        start:"top 40%",
        end:"top 30%",
        scrub:3
    }
});
tlV.to("#section1 video", {
    width: "90%"
}, "anim");

var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:".container",
        scroller:".container",
        // markers:true,
        start:"top -150%",
        end:"top -165%",
        scrub:3
    }
});
tl2.to(".container", {
    backgroundColor: "#efecec"
})

var tl3 = gsap.timeline({
    scrollTrigger:{
        trigger:".container",
        scroller:".container",
        // markers:true,
        start:"top -255%",
        end:"top -260%",
        scrub:3
    }
});
tl3.to(".container", {
    backgroundColor: "rgb(26,26,26)"
});


// function onMouseMove(){
//     window.addEventListener('mousemove',dets=>{
//         document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`
//     })
// }

document.querySelectorAll(".elem").forEach(elem=>{
    var rotate = 0;
    var difrot = 0;

    elem.addEventListener('mouseleave',function(){
        
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            duration:1,
            ease:Power3,
            
        });
    });

    elem.addEventListener('mousemove',details=>{
        var diff = details.clientY - elem.getBoundingClientRect().top;
        difrot = details.clientX - rotate;
        rotate = details.clientX;
        console.log(details.clientX,details.clientY);
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20,20,difrot)
        });
    });
});

var currentSlide = 0;

function runCarousel(){
    document.querySelectorAll('#bgImagesContainer .backgrounds').forEach(background=>{
        background.classList.add('activeimageSlide');
    })
    document.querySelectorAll('#contentParts img').forEach(img=>{
        img.classList.add('activeimageSlide');
    })
    setTimeout(()=>{
        document.getElementById('bgImagesContainer').append(document.getElementById('bgImagesContainer').firstElementChild);
        document.getElementById('contentParts').append(document.getElementById('contentParts').firstElementChild);
        // document.getElementById('bgImagesContainer').lastElementChild.classList.remove('activeimageSlide');
        document.querySelectorAll('#bgImagesContainer .backgrounds').forEach(div=>{
            div.classList.remove('activeimageSlide');
        })
        document.querySelectorAll('#contentParts img').forEach(img=>{
            img.classList.remove('activeimageSlide');
        })
    
    },500);
}
function runCarouselBack(){
    
     document.querySelectorAll('#bgImagesContainer .backgrounds').forEach(background=>{
        background.classList.add('activeReverseImgSlide');
    })
    document.querySelectorAll('#contentParts img').forEach(img=>{
        img.classList.add('activeReverseImgSlide');
    })
    setTimeout(()=>{
        document.getElementById('bgImagesContainer').prepend(document.getElementById('bgImagesContainer').lastElementChild);
        document.getElementById('contentParts').prepend(document.getElementById('contentParts').lastElementChild);
        // document.getElementById('bgImagesContainer').lastElementChild.classList.remove('activeimageSlide');
        document.querySelectorAll('#bgImagesContainer .backgrounds').forEach(div=>{
            div.classList.remove('activeReverseImgSlide');
        })
        document.querySelectorAll('#contentParts img').forEach(img=>{
            img.classList.remove('activeReverseImgSlide');
        })
    
    },500);
}
