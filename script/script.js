const line = document.getElementById('line');
const age =document.getElementById('age');
const load = document.getElementById('load');
const switcher = document.getElementById('switch');
const html = document.getElementById('html');
lucide.createIcons();
const switch_auto = document.getElementById('switch-auto');
async function getIP()
{
    let token = "3ad52514059894";
    await fetch(`https://api.ipinfo.io/lite/me`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            line.style.setProperty('--before-content', `"|||${data.ip}|||${data.country}|||${data.ip}|||${data.ip}|||${data.ip}|||${data.ip}|||${data.ip}|||${data.ip}|||${data.ip}|||"`)
        });
}
const date = new Date();
const bDate = new Date('2004-12-22');
age.innerHTML += " " + Math.floor(Math.abs((bDate - date)/(1000*60*60*24*365)));
getIP();
window.addEventListener('load', function ()
{
    const cookie = document.cookie.split('=')[1];
    load.classList.add('loading-area-animation');
    if (window.matchMedia('(prefers-color-scheme: light)').matches) switcher.children.item(0).style.marginLeft = '50%';
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', ()=>{
        if (window.matchMedia('(prefers-color-scheme: light)').matches) switcher.children.item(0).style.marginLeft = '50%';
        else switcher.children.item(0).style.marginLeft = '0%';
    })
    if(document.cookie) {
        html.style.colorScheme = cookie;
        if (cookie === "light") switcher.children.item(0).style.marginLeft = '50%';
    }
    if (html.style.colorScheme === 'dark light')
    {
        switch_auto.style.transform = "rotateZ(90deg)";
        switch_auto.style.color = "#ffffff";
    }
})
switcher.addEventListener('click', () => {
    if (html.style.colorScheme === 'dark') {
        html.style.colorScheme = "light";
        switcher.children.item(0).style.marginLeft = '50%';
        document.cookie = 'theme=light';
    }
    else if (html.style.colorScheme === 'light'){
        html.style.colorScheme = "dark";
        switcher.children.item(0).style.marginLeft = '0';
        document.cookie = 'theme=dark';
    }else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById('html').style.colorScheme = "light";
        switcher.children.item(0).style.marginLeft = '50%';
        document.cookie = 'theme=light';
        switch_auto.style.transform = "rotateZ(0deg)"
        switch_auto.style.color = "#a3a3a3";
    }
    else {
        html.style.colorScheme = "dark";
        switcher.children.item(0).style.marginLeft = '0';
        document.cookie = 'theme=dark';
        switch_auto.style.transform = "rotateZ(0deg)"
        switch_auto.style.color = "#a3a3a3";
    }
});
switch_auto.addEventListener('click', ()=>{
  if (html.style.colorScheme==="dark light")
  {
      switch_auto.style.transform = "rotateZ(0deg)"
      switch_auto.style.color = "#a3a3a3";
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.getElementById('html').style.colorScheme = "light";
          switcher.children.item(0).style.marginLeft = '50%';
          document.cookie = 'theme=light';
      }
      else {
          html.style.colorScheme = "dark";
          switcher.children.item(0).style.marginLeft = '0';
          document.cookie = 'theme=dark';
      }
  }else
  {
      html.style.colorScheme = "dark light";
      switch_auto.style.transform = "rotateZ(90deg)";
      switch_auto.style.color = "#ffffff";
      document.cookie = "theme = 0; max-age=-1;";
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          switcher.children.item(0).style.marginLeft = '50%';
      }
      else {
          switcher.children.item(0).style.marginLeft = '0';
      }
  }
});
const carousel = document.getElementById('carousel');
const triggers = document.querySelectorAll('.skills-area span[data-target]');
if(screen.availHeight < screen.availWidth && window.innerHeight < window.innerWidth){
    let carousel_animation = carousel.animate(
        [
            { transform: 'rotateX(-5deg) rotateY(0deg)' },
            { transform: 'rotateX(-5deg) rotateY(360deg)' }
        ],
        {
            duration: 30000,
            iterations: Infinity,
            easing: 'linear'
        }
    );
    triggers.forEach((trigger, index) => {
        const targetId = trigger.dataset.target;
        const targetImg = document.getElementById(targetId);
        if (!targetImg) return;
        function setImageState(isActive) {
            const size = isActive ? '200px' : '150px';
            const translateY = isActive ? '-50px' : '0px';
            const translateZ = isActive ? '460px' : '440px';
            const background = isActive ? 'white' : "rgba(191, 191, 191, 0.86)";
            targetImg.style.width = size;
            targetImg.style.height = size;
            targetImg.parentElement.style.transform = `rotateY(${360/18*index}deg) translateY(${translateY}) translateZ(${translateZ})`;
            targetImg.parentElement.style.background = background;
            targetImg.parentElement.style.width = size;
            targetImg.parentElement.style.height = size;
            if (isActive) carousel_animation.cancel();
            void carousel.offsetHeight;
            if (!isActive) carousel_animation = carousel.animate(
                [
                    { transform: `rotateX(-5deg) rotateY(-${360/18*index}deg)` },
                    { transform: `rotateX(-5deg) rotateY(-${360/18*index+360}deg)` }
                ],
                {
                    duration: 30000,
                    iterations: Infinity,
                    easing: 'linear'
                }
            );
            carousel.style.transform = `rotateX(-5deg) rotateY(-${360/18*index}deg)`;
        }
        trigger.addEventListener('mouseenter', () => setImageState(true));
        trigger.addEventListener('mouseleave', () => setImageState(false));
    });
}