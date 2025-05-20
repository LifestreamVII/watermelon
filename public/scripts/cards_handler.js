document.addEventListener("DOMContentLoaded", function() {
  
    const card = document.querySelectorAll(".card");
    
    card.forEach(item => {
      item.addEventListener('mouseover', event => {
        item.firstElementChild.nextElementSibling.style.maxHeight = "100%";
      }, false)

      item.addEventListener('mouseout', event => {
        item.firstElementChild.nextElementSibling.style.maxHeight = "42%";
      }, false)
    })

    const tab = document.querySelectorAll(".tabs");

    for (const item of tab) {

      const pathUrl = window.location.pathname;
      const pathUrlArray = pathUrl.split("/");

      if (pathUrlArray[pathUrlArray.length - 1] == item.dataset.tab) {
        item.classList.add('active');
      }

      item.addEventListener('click', event => {
        let tabactive = document.querySelector(".tabs.active");
        if (tabactive != null){
          tabactive.classList.remove('active');
        }
        event.currentTarget.classList.toggle("active");
      }, false)      

    }

});
