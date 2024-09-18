// Elements
// # section 1
// # section 2
// # section 3
const allChannels = document.querySelector('.all-channels')
// extra
const backtotopBtn = document.querySelector('.bottom-nav__inner__backtotop-btn');

// mobile check
isMobile = false;
// device detection
function checkIsMobile() {
   if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isMobile = true;
   }
}
checkIsMobile();
window.addEventListener('resize', checkIsMobile);

// snap scrollers
const snapScrollers= document.querySelectorAll('.snap-scroller');
snapScrollers.forEach(scroller => {
   const eventsScrollerWrapper = scroller;
   const eventsScroller = scroller.querySelector('.snap-scroller__inner-wrapper');
   const eventsScrollerInner = scroller.querySelector('.snap-scroller__inner');
   const eventscrollerPrevBtn = scroller.querySelector('.snap-scroller__controls__btn--prev');
   const eventscrollerNextBtn = scroller.querySelector('.snap-scroller__controls__btn--next');
   let eventsScrollerCrntScrollX = eventsScroller.scrollLeft;
   checkEventsScrollerBtnsActivity();
   // disabling item-drags
   eventsScroller.querySelectorAll('.snap-scroller__inner__item').forEach(a => {
      a.setAttribute('draggable', false);
      a.ondragstart = () => {return false;};
   })
   eventsScroller.querySelectorAll('a').forEach(a => {
      a.setAttribute('draggable', false);
      a.ondragstart = () => {return false;};
   })
   eventsScroller.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', false);
      img.ondragstart = () => {return false;};
   })
   
   // drag controls
   
   let eventsScrollerIsMouseDown = false;
   let eventsScrollerLastMouseX;
   let eventsScrollerLastMouseXDiff;
   let eventsScrollerSnapTimeout;
   let eventsScrollerSnapXAmound = 0;
   let eventsScrollerItemWidth = eventsScroller.querySelector('.snap-scroller__inner__item').offsetWidth + (parseInt(getComputedStyle(eventsScrollerInner).getPropertyValue('gap')) );
   if (!isMobile) {
      eventsScroller.addEventListener('mousedown', e => {
         eventsScrollerIsMouseDown = true;
         eventsScrollerLastMouseX = e.pageX - e.currentTarget.getBoundingClientRect().left;
         eventsScrollerLastMouseXDiff = 0;
      })
      
      eventsScroller.addEventListener('mouseup', e => {
         eventsScrollerIsMouseDown = false;
      })
      
      eventsScroller.addEventListener('mouseleave', e => {
         eventsScrollerIsMouseDown = false;
      })
      
      eventsScroller.addEventListener('mousemove', e => {
         if (!eventsScrollerIsMouseDown) return;
         handleEventsScrollerDrag(e);
      })
   } else {
      eventsScroller.style.scrollSnapType = 'x mandatory';
      eventsScroller.querySelectorAll('.snap-scroller__inner__item').forEach(item => {
         item.style.scrollSnapAlign = 'start';
      })
      scroller.querySelector('.snap-scroller__controls').style.display = 'none';
   }
   
   // eventsScroller.addEventListener('touchstart', e => {
   //    eventsScrollerIsMouseDown = true;
   //    eventsScrollerLastMouseX = e.touches[0].pageX - e.currentTarget.getBoundingClientRect().left;
   //    eventsScrollerLastMouseXDiff = 0;
   // })
   
   // eventsScroller.addEventListener('touchend', e => {
   //    eventsScrollerIsMouseDown = false;
   // })
   
   // eventsScroller.addEventListener('touchcancel', e => {
   //    eventsScrollerIsMouseDown = false;
   // })
   
   // eventsScroller.addEventListener('touchmove', e => {
   //    if (!eventsScrollerIsMouseDown) return;
   //    handleEventsScrollerTouchDrag(e);
   // })
   
   function handleEventsScrollerDrag(e) {
      clearTimeout(eventsScrollerSnapTimeout);
      let curntMouseX = e.pageX - e.currentTarget.getBoundingClientRect().left;
      let mouseXDiff = curntMouseX - eventsScrollerLastMouseX;
   
      const newScrollX = eventsScrollerCrntScrollX - mouseXDiff;
   
      if (
         (mouseXDiff > 0 && eventsScrollerCrntScrollX === 0) ||
         (mouseXDiff < 0 && eventsScrollerCrntScrollX === eventsScroller.scrollWidth - eventsScrollerWrapper.offsetWidth)
      ) {
         return;
      }
   
      eventsScroller.scrollLeft = newScrollX;
      eventsScrollerLastMouseXDiff = mouseXDiff;
   
      eventsScrollerSnapTimeout = setTimeout(() => {
         eventScrollerSnap();
      }, 300);
   }
   
   // function handleEventsScrollerTouchDrag(e) {
   //    clearTimeout(eventsScrollerSnapTimeout);
   //    let curntMouseX = e.touches[0].pageX - e.currentTarget.getBoundingClientRect().left;
   //    let mouseXDiff = curntMouseX - eventsScrollerLastMouseX;
   
   //    const newScrollX = eventsScrollerCrntScrollX - mouseXDiff;
   
   //    if (
   //       (mouseXDiff > 0 && eventsScrollerCrntScrollX === 0) ||
   //       (mouseXDiff < 0 && eventsScrollerCrntScrollX === eventsScroller.scrollWidth - eventsScrollerWrapper.offsetWidth)
   //    ) {
   //       return;
   //    }
   
   //    eventsScroller.scrollLeft = newScrollX;
   //    eventsScrollerLastMouseXDiff = mouseXDiff;
   
   //    eventsScrollerSnapTimeout = setTimeout(() => {
   //       eventScrollerSnap();
   //    }, 200);
   // }
   
   function eventScrollerSnap() {
      const round = -1 * Math.round(Math.floor(100 * eventsScrollerLastMouseXDiff / eventsScrollerWrapper.offsetWidth) / 100);
      // const round = -1 * Math.round(Math.floor(100 * eventsScrollerLastMouseXDiff / eventsScrollerItemWidth) / 100);
      // let snapScrollAmount = round * eventsScrollerItemWidth;
      let snapScrollAmount;
      if ((eventsScroller.scrollWidth - eventsScroller.scrollLeft) > Math.floor(eventsScrollerWrapper.offsetWidth / eventsScrollerItemWidth) * eventsScrollerItemWidth) {
         snapScrollAmount = round * Math.floor(eventsScrollerWrapper.offsetWidth / eventsScrollerItemWidth) * eventsScrollerItemWidth;
      } else {
         snapScrollAmount = eventsScrollerItemWidth;
      }
   
      eventsScroller.scrollTo({
         left: eventsScrollerCrntScrollX + snapScrollAmount,
         behavior: 'smooth',
      })
   
      setTimeout(() => {
         eventsScrollerCrntScrollX = eventsScroller.scrollLeft;
         eventsScrollerLastMouseXDiff = 0;
      }, 1000);
   }
   // buttons controls
   eventscrollerPrevBtn.addEventListener('click', e => {
      scrollXEventsScroller('l');
   })
   eventscrollerNextBtn.addEventListener('click', e => {
      scrollXEventsScroller('r');
   })
   
   // scrollX function
   function scrollXEventsScroller(dir) {  /* dir: 'l'/'r' */
      if (
         (eventsScrollerCrntScrollX === 0 && dir === 'l') ||
         (eventsScrollerCrntScrollX === eventsScroller.scrollWidth - eventsScrollerWrapper.offsetWidth && dir === 'r')
      ) {
         return;
      }
   
      const scrollXUnit = Math.floor(eventsScrollerWrapper.offsetWidth / eventsScrollerItemWidth) * eventsScrollerItemWidth;
   
      let scrollXAmount = (dir === 'l') ? -1 * scrollXUnit : scrollXUnit;
      
      eventsScroller.scrollTo({
         left: eventsScrollerCrntScrollX + scrollXAmount,
         behavior: 'smooth'
      })
      eventsScrollerCrntScrollX = eventsScrollerCrntScrollX + scrollXAmount;
   
      setTimeout(() => {
         // eventScrollerSnap();
         checkEventsScrollerBtnsActivity();
      }, 1000);
   }
   
   // activation of buttons
   function checkEventsScrollerBtnsActivity() {
      if (eventsScroller.scrollLeft === 0) {
         eventscrollerPrevBtn.classList.remove('active');
         eventscrollerPrevBtn.setAttribute('aria-disabled', true);
      } else {
         eventscrollerPrevBtn.classList.add('active');
         eventscrollerPrevBtn.setAttribute('aria-disabled', false);
      }
      
      if (eventsScroller.scrollLeft === (eventsScroller.scrollWidth - eventsScrollerWrapper.offsetWidth)) {
         eventscrollerNextBtn.classList.remove('active');
         eventscrollerNextBtn.setAttribute('aria-disabled', true);
      } else {
         eventscrollerNextBtn.classList.add('active');
         eventscrollerNextBtn.setAttribute('aria-disabled', false);
      }
   }
})

const artGrids = document.querySelectorAll('.art-grid');

const exploreMenu = document.querySelector('.channels__category-selection__explore__menu');
const exploreMenuBtn = document.querySelector('.channels__category-selection__explore__btn');
const exploreMenuCloseBtn = document.querySelector('.channels__category-selection__explore__menu__close-btn');

const mobileResultTypeMenu = document.querySelector('.bottom-nav__inner__results-type__mobile-inner');
const mobileResultTypeMenuCurrentBtn = document.querySelector('.bottom-nav__inner__results-type__mobile-inner__current-results-type__btn');
const mobileResultTypeSelectBtns = document.querySelectorAll('.bottom-nav__inner__results-type__mobile-inner__results-type-select__btn');

// category menus
document.addEventListener('click', e => {
   const {target} = e;
   if (target.closest('.channels__category-selection__explore__menu__categories-cont__select-cont__btn')) {
      const btn = target.closest('.channels__category-selection__explore__menu__categories-cont__select-cont__btn');
      btn.classList.toggle('closed');
      (btn.getAttribute('aria-expanded') === 'false') ? btn.setAttribute('aria-expanded', true) : btn.setAttribute('aria-expanded', false) ;
      return;
   }

   if (target.closest('.channels__category-selection__explore__btn')) {
      exploreMenu.classList.toggle('closed');
      (exploreMenuBtn.getAttribute('aria-expanded') === 'false') ? exploreMenuBtn.setAttribute('aria-expanded', true) : exploreMenuBtn.setAttribute('aria-expanded', false) ;
      return;
   }

   if (target.closest('.channels__category-selection__explore__menu__close-btn')) {
      exploreMenu.classList.add('closed');
      return;
   }

   if (target.closest('.channels__category-selection__ad-link__close-btn')) {
      const btn = target.closest('.channels__category-selection__ad-link__close-btn');
      btn.classList.toggle('active');
      (btn.getAttribute('aria-expanded') === 'false') ? btn.setAttribute('aria-expanded', true) : btn.setAttribute('aria-expanded', false) ;
      return;
   }

   if (target.closest('.bottom-nav__inner__grid-controls__main-btn')) {
      const btn = target.closest('.bottom-nav__inner__grid-controls__main-btn');
      btn.closest('.bottom-nav__inner__grid-controls').classList.toggle('opened');
      (btn.getAttribute('aria-expanded') === 'false') ? btn.setAttribute('aria-expanded', true) : btn.setAttribute('aria-expanded', false) ;
      return;
   }
   
   if (target.closest('.bottom-nav__inner__backtotop-btn')) {
      scrollTo({
         top: 0,
         behavior: 'smooth'
      })
      return;
   }

   if (target.closest('.bottom-nav__inner__results-type__desktop-inner__btn')) {
      const btn = target.closest('.bottom-nav__inner__results-type__desktop-inner__btn');
      btn.closest('.bottom-nav__inner__results-type__desktop-inner').querySelectorAll('.bottom-nav__inner__results-type__desktop-inner__btn').forEach(btn => {
         btn.classList.remove('active');
      })
      btn.classList.add('active');
      return;
   }

   if (target.closest('.bottom-nav__inner__filter__btn')) {
      const btn = target.closest('.bottom-nav__inner__filter__btn');
      btn.closest('.bottom-nav__inner__filter').querySelector('.bottom-nav__inner__filter__menu').classList.toggle('opened');
      (btn.getAttribute('aria-expanded') === 'false') ? btn.setAttribute('aria-expanded', true) : btn.setAttribute('aria-expanded', false) ;
      return;
   }

   if (target.closest('.bottom-nav__inner__results-type__mobile-inner__current-results-type__btn')) {
      mobileResultTypeMenu.classList.toggle('opened');
      (mobileResultTypeMenuCurrentBtn.getAttribute('aria-expanded') === 'false') ? mobileResultTypeMenuCurrentBtn.setAttribute('aria-expanded', true) : mobileResultTypeMenuCurrentBtn.setAttribute('aria-expanded', false) ;
      return;
   }

   if (target.closest('.bottom-nav__inner__results-type__mobile-inner__results-type-select__btn')) {
      const crntBtn = target.closest('.bottom-nav__inner__results-type__mobile-inner__results-type-select__btn');
      mobileResultTypeSelectBtns.forEach(btn => {
         btn.classList.remove('active');
      })
      crntBtn.classList.add('active');
      mobileResultTypeMenu.classList.remove('opened');
      mobileResultTypeMenuCurrentBtn.querySelector('.bottom-nav__inner__results-type__mobile-inner__current-results-type__btn__text').innerText = crntBtn.innerText;
      return;
   }

   if (target.closest('.dec-grid-size')) {
      artGrids.forEach(grid => {
         grid.style.setProperty('--base-grid-items-count', 3);
      })
      return;
   }

   if (target.closest('.inc-grid-size')) {
      artGrids.forEach(grid => {
         grid.style.setProperty('--base-grid-items-count', 2);
      })
      return;
   }
}, {passive: true})

// back to top btn
window.addEventListener('scroll', e => {
   if (scrollY > (allChannels.offsetTop + allChannels.offsetHeight)) {
      return;
   }
   throttle(checkBacktotopBtnAppearance, 10)();
})

function checkBacktotopBtnAppearance () {
   console.log('a');
   if (window.scrollY >= allChannels.offsetTop) {
      backtotopBtn.classList.add('shown');
      backtotopBtn.tabIndex = 0;
   } else {
      backtotopBtn.classList.remove('shown');
      backtotopBtn.tabIndex = -1;
   }
}

function throttle(func, delay) {
   let throttled = false;
   return (...args) => {
      if (!throttled) {
         throttled = true;
         func.apply(this, args);
         setTimeout(() => {
            throttled = false;
         }, delay);
      }
   }
}