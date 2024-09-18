// header
const topNavSearches = document.querySelectorAll('.header__nav__search-cont__form__inner__inp');
const topMobileMenu = document.querySelector('.header__nav__mobile-menu');
const topMobileMenuOpenBtn = document.querySelector('.header__nav__menu-btn');
//footer

// click events
const clickDropdowns = document.querySelectorAll('.dropdown-toggle-click');
document.addEventListener('click', e => {
   const {target} = e;
   // mobile menu open/close
   if (target.closest('.header__nav__menu-btn')) {
      toggleMobileMenu();
   }
   // dropdowns control
   if (target.closest('.dropdown-toggle-click')) {
      const closest = target.closest('.dropdown-toggle-click');
      const item = closest.closest('li');
      const list = item.closest('ul');
      const items = list.querySelectorAll('li');
      items.forEach(el => {
         el.classList.remove('current');
      })
      item.classList.add('current');
      items.forEach((el, i) => {
         if (!el.classList.contains('current')) {
            el.closest('li').classList.remove('active');
         }
      })
      if (item.classList.contains('active')) {
         item.classList.remove('active');
         closest.setAttribute('aria-expanded', false);
      } else {
         item.classList.add('active');
         closest.setAttribute('aria-expanded', true);
      }
   }

   e.stopPropagation();
})

// top nav search input
const cancelBtns = document.querySelectorAll('.cancel-btn');

topNavSearches.forEach(el => {
   el.addEventListener('input', e => {
      const {currentTarget:input} = e;
      checkCancelBtn(input);
   }) 
})

function checkCancelBtn(inp) {
   const cancelBtn = inp.closest('form').querySelector('.cancel-btn');
   if (!cancelBtn) return;
   const {value} =  inp;
   if (
      value === "" ||
      value === null ||
      value === undefined 
   ) {
      cancelBtn.classList.remove('active');
      cancelBtn.setAttribute('tabindex', -1);
   } else {
      console.log('a')
      cancelBtn.classList.add('active');
      cancelBtn.setAttribute('tabindex', 0);
   }
}

cancelBtns.forEach((btn, i) => {
   btn.addEventListener('click', e => {
      const inp = btn.closest('form').querySelector('input');
      if (!inp) return;
      inp.value = "";
      checkCancelBtn(inp);
   })
})

function toggleMobileMenu() {
   topMobileMenu.classList.toggle('active');
   topMobileMenuOpenBtn.classList.toggle('active');
   topMobileMenuOpenBtn.getAttribute('aria-expanded') === false ? topMobileMenuOpenBtn.setAttribute('aria-expanded', true) : topMobileMenuOpenBtn.setAttribute('aria-expanded', false);
}