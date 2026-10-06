const cover = document.querySelector('.cover');
const nextButton = document.querySelector('.page-next');
nextButton?.addEventListener('click', () => {
  if (cover?.classList.contains('book-open')) return;
  cover?.classList.add('book-open');
  setTimeout(() => document.querySelector('#before')?.scrollIntoView({behavior:'smooth', block:'start'}), 780);
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.entry,.mini-grid article,.entries article,.collage figure,.feature-memory,.money,.zoo-again,.little-life,.memory-roll figure').forEach((el)=>{
    gsap.from(el,{y:28,opacity:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}})
  });
  gsap.from('.ten',{scale:.82,opacity:0,duration:.8,ease:'back.out(1.5)',scrollTrigger:{trigger:'.dayone',start:'top 70%'}});
  gsap.from('.zoo-stack img',{y:45,opacity:0,rotation:0,stagger:.12,duration:.7,scrollTrigger:{trigger:'.zoo-stack',start:'top 88%'}});
  gsap.from('.stop',{opacity:0,y:25,duration:1,scrollTrigger:{trigger:'.stop',start:'top 82%'}});
  gsap.from('.continue',{opacity:0,duration:1,scrollTrigger:{trigger:'.continue',start:'top 84%'}});
}


// Ending hug button: every tap throws a fresh burst of hearts.
const hugButton = document.querySelector('.hug-button');
const heartBurst = document.querySelector('.heart-burst');
const hugLabels = ['馬上給咪拍大抱抱 ♡','再一個 ♡','再一個！♡','還要 ♡','很多很多 ♡'];
let hugCount = 0;

if (hugButton && heartBurst) {
  hugButton.addEventListener('click', () => {
    hugCount += 1;
    hugButton.textContent = hugLabels[Math.min(hugCount, hugLabels.length - 1)];
    hugButton.classList.remove('is-popping');
    void hugButton.offsetWidth;
    hugButton.classList.add('is-popping');
    setTimeout(() => hugButton.classList.remove('is-popping'), 180);

    const rect = hugButton.getBoundingClientRect();
    for (let i = 0; i < 14; i += 1) {
      const heart = document.createElement('span');
      heart.className = 'burst-heart';
      heart.textContent = Math.random() > .45 ? '♡' : '♥';
      heart.style.left = `${rect.left + rect.width / 2}px`;
      heart.style.top = `${rect.top + rect.height / 2}px`;
      heart.style.setProperty('--heart-x', `${Math.round(Math.random() * 280 - 140)}px`);
      heart.style.setProperty('--heart-y', `${Math.round(-90 - Math.random() * 130)}px`);
      heart.style.setProperty('--heart-r', `${Math.round(Math.random() * 80 - 40)}deg`);
      heart.style.setProperty('--heart-size', `${Math.round(18 + Math.random() * 20)}px`);
      document.body.appendChild(heart);
      heart.addEventListener('animationend', () => heart.remove(), {once:true});
    }
  });
}

// Independent replay control: works even if optional animation libraries fail.
document.querySelectorAll('a[href="#top"], .replay, .back-top').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});
