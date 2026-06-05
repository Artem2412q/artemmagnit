const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotionQuery.matches) document.documentElement.classList.add('reduce-motion');
const html=document.documentElement;const preloader=document.getElementById('preloader');const cursor=document.getElementById('cursor');const themeButtons=[document.getElementById('themeToggle'),document.getElementById('mobileThemeToggle')].filter(Boolean);const savedTheme=localStorage.getItem('theme');if(savedTheme)html.dataset.theme=savedTheme;window.addEventListener('load',()=>{setTimeout(()=>preloader.classList.add('hide'),450);setTimeout(()=>preloader.remove(),1250)});themeButtons.forEach(button=>{button.addEventListener('click',()=>{const nextTheme=html.dataset.theme==='dark'?'light':'dark';html.dataset.theme=nextTheme;localStorage.setItem('theme',nextTheme)})});const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('visible');revealObserver.unobserve(entry.target)})},{threshold:.14});document.querySelectorAll('.reveal').forEach((el,index)=>{el.style.transitionDelay=`${Math.min(index*45,220)}ms`;revealObserver.observe(el)});const countObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.querySelectorAll('[data-count]').forEach(number=>{const target=Number(number.dataset.count);const duration=target>100?1350:900;const start=performance.now();const animate=now=>{const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,4);number.textContent=Math.floor(target*eased);if(progress<1)requestAnimationFrame(animate);else number.textContent=target};requestAnimationFrame(animate)});countObserver.unobserve(entry.target)})},{threshold:.45});document.querySelectorAll('.stats').forEach(el=>countObserver.observe(el));const modal=document.getElementById('postModal');const modalTitle=document.getElementById('modalTitle');const modalDate=document.getElementById('modalDate');const modalText=document.getElementById('modalText');function openModal(card){modalTitle.textContent=card.dataset.title;modalDate.textContent=card.dataset.date;modalText.textContent=card.dataset.text;modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')}function closeModal(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}document.querySelectorAll('.news-card').forEach(card=>{card.addEventListener('click',()=>openModal(card))});document.querySelectorAll('[data-close-modal]').forEach(button=>{button.addEventListener('click',closeModal)});window.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});const track=document.getElementById('galleryTrack');const slides=Array.from(document.querySelectorAll('.gallery__slide'));const prev=document.getElementById('galleryPrev');const next=document.getElementById('galleryNext');const dots=document.getElementById('galleryDots');const current=document.getElementById('galleryCurrent');let galleryIndex=0;let galleryTimer;slides.forEach((_,index)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Открыть фото ${index+1}`);dot.addEventListener('click',()=>setGallery(index));dots.appendChild(dot)});const dotButtons=Array.from(dots.querySelectorAll('button'));function setGallery(index){galleryIndex=(index+slides.length)%slides.length;track.style.transform=`translateX(${-galleryIndex*100}%)`;slides.forEach((slide,slideIndex)=>{slide.classList.toggle('is-active',slideIndex===galleryIndex)});dotButtons.forEach((dot,dotIndex)=>{dot.classList.toggle('is-active',dotIndex===galleryIndex)});current.textContent=String(galleryIndex+1).padStart(2,'0');restartGalleryTimer()}function restartGalleryTimer(){clearInterval(galleryTimer);galleryTimer=setInterval(()=>setGallery(galleryIndex+1),5200)}prev.addEventListener('click',()=>setGallery(galleryIndex-1));next.addEventListener('click',()=>setGallery(galleryIndex+1));setGallery(0);const skillsPanel=document.getElementById('skillsPanel');const gauge=document.querySelector('.resume-gauge');const gaugeValue=document.querySelector('.resume-gauge__value');const skillsObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;document.querySelectorAll('.skill-bar').forEach((bar,index)=>{const progress=Number(bar.dataset.progress);const fill=bar.querySelector('.skill-bar__track span');setTimeout(()=>{fill.style.width=`${progress}%`},index*90)});if(gauge&&gaugeValue){const target=Number(gauge.dataset.progress);const duration=1200;const start=performance.now();const animateGauge=now=>{const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,3);const value=Math.floor(target*eased);gauge.style.setProperty('--progress',value);gaugeValue.textContent=`${value}%`;if(progress<1)requestAnimationFrame(animateGauge);else{gauge.style.setProperty('--progress',target);gaugeValue.textContent=`${target}%`}};requestAnimationFrame(animateGauge)}skillsObserver.unobserve(entry.target)})},{threshold:.35});if(skillsPanel)skillsObserver.observe(skillsPanel);if(window.matchMedia('(hover: hover)').matches && !reduceMotionQuery.matches){let mouseX=0,mouseY=0,cursorX=0,cursorY=0;window.addEventListener('mousemove',event=>{mouseX=event.clientX;mouseY=event.clientY;cursor.style.opacity='1'});const renderCursor=()=>{cursorX+=(mouseX-cursorX)*.18;cursorY+=(mouseY-cursorY)*.18;cursor.style.transform=`translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;requestAnimationFrame(renderCursor)};renderCursor();document.querySelectorAll('a, button, .magnetic, .tilt').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',event=>{const rect=el.getBoundingClientRect();const x=event.clientX-rect.left-rect.width/2;const y=event.clientY-rect.top-rect.height/2;el.style.transform=`translate(${x*.12}px, ${y*.18}px)`});el.addEventListener('mouseleave',()=>{el.style.transform=''})});document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('mousemove',event=>{const rect=card.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width;const y=(event.clientY-rect.top)/rect.height;const rotateY=(x-.5)*9;const rotateX=(.5-y)*9;card.style.transform=`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`});card.addEventListener('mouseleave',()=>{card.style.transform=''})})}window.addEventListener('scroll',()=>{const offset=window.scrollY;document.querySelectorAll('.orb').forEach((orb,index)=>{const speed=(index+1)*.025;orb.style.transform=`translateY(${offset*speed}px)`})},{passive:true});

/* V4: scroll progress, active navigation and premium card light */
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const navLinks = Array.from(document.querySelectorAll('.sidebar nav a'));
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = `#${entry.target.id}`;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === id);
    });
  });
}, {
  threshold: 0.35,
  rootMargin: '-20% 0px -55% 0px'
});

navTargets.forEach((section) => navObserver.observe(section));

document.querySelectorAll('.hero__content, .hero__card, .card, .mission, .strength, .gallery, .telegram-card, .news-card, .resume-summary, .resume-education, .resume-timeline, .resume-duties, .resume-skills').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});


/* V5: subtle parallax for background phrases */
const ambientItems = document.querySelectorAll('.ambient-word, .ambient-star');

window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;

  ambientItems.forEach((item, index) => {
    const speed = 0.012 + index * 0.004;
    item.style.setProperty('--scroll-shift', `${y * speed}px`);
  });
}, { passive: true });


/* V6: premium ambient mouse drift */
if (window.matchMedia('(hover: hover)').matches && !reduceMotionQuery.matches) {
  const ambientWordsForDrift = document.querySelectorAll('.ambient-word');

  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 2;
    const y = (event.clientY / window.innerHeight - .5) * 2;

    ambientWordsForDrift.forEach((word, index) => {
      const power = 6 + index * 3;
      word.style.translate = `${x * power}px ${y * power}px`;
    });
  });
}


/* V7: staggered animation inside resume cards */
const resumeDetailObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.querySelectorAll('.resume-metrics div, .education-points span, .education-mini div, .resume-chips span').forEach((item, index) => {
      item.style.transitionDelay = `${index * 55}ms`;
      item.classList.add('detail-visible');
    });

    resumeDetailObserver.unobserve(entry.target);
  });
}, { threshold: 0.35 });

document.querySelectorAll('.resume-summary, .resume-education').forEach((card) => {
  resumeDetailObserver.observe(card);
});


/* V13: reduced motion hard stop for JS-driven movement */
if (reduceMotionQuery.matches) {
  window.addEventListener('load', () => {
    document.querySelectorAll('.ambient-word, .ambient-star, .orb, .magnetic, .tilt').forEach((el) => {
      el.style.transform = '';
      el.style.translate = '';
      el.style.marginTop = '';
    });
  });
}
