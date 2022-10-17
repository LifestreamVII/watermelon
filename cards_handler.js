function chk(target, times, delay, timeout) {
  var failedTimeout = false;
  
  return Promise.race([
      new Promise((res, rej) => {
          (function rec(i) {
              fetch(target, {mode: 'no-cors'}).then((r) => {
                  res(r);
              }).catch( err => {
                  if (failedTimeout) return;
                  if (i === 0) return rej(err);
                  setTimeout(() => rec(--times), delay);
              });
          })(times);
      }),
      new Promise(function (resolve, reject) {
          failedTimeout = true;
          setTimeout(() => reject(new Error('request timeout')), timeout);
      }),
  ]);
}

function updServer(status){
  const serverStatus = document.getElementById("server-status");
  if (status === 1){
    serverStatus.classList.remove('gray-dot');
    serverStatus.classList.add('green-dot');
    serverStatus.title = "Na-No Server is Online";
  }
  else if (status === 0)
  {
    serverStatus.classList.remove('gray-dot');
    serverStatus.classList.add('red-dot');
    serverStatus.title = "Na-No Server appears to be Offline (portfolio may be inaccessible).";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  
    chk('https://na-no.pro/', 1, 0, 6000).then(r=>{updServer(1)}).catch(e=>{updServer(0);});

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

    tab.forEach(item => {
      item.addEventListener('click', event => {
        let tabactive = document.querySelector(".tabs.active");
        if (tabactive != null){
          tabactive.classList.remove('active');
        }
        else{
        }

          let tabid = event.currentTarget.getAttribute('data-tab');
          let tabcont = document.getElementById(tabid);
          tabcont.classList.remove("hidden");
          let tabsall = document.querySelectorAll(".cards-container");
          tabsall.forEach(item => { if (item != tabcont) item.classList.add('hidden'); })

        event.currentTarget.classList.toggle("active");
      }, false)
    })

});
