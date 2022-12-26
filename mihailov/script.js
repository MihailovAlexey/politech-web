function classToggle() {
  const navs = document.querySelectorAll('.nav_items')
  
  navs.forEach(nav => nav.classList.toggle('nav_toggle-show'));
}

document.querySelector('.nav_link-toggle')
  .addEventListener('click', classToggle);