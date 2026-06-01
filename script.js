const preloader = document.getElementById('preloader');
const cursor = document.getElementById('cursor');

window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  setTimeout(() => {
    preloader.classList.add('hide');
  }, 650);

  setTimeout(() => {
    preloader.remove();
  }, 1550);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
  revealObserver.observe(el);
});

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const numbers = entry.target.querySelectorAll('[data-count]');
    numbers.forEach((number) => {
      const target = Number(number.dataset.count);
      const duration = target > 100 ? 1350 : 950;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        number.textContent = Math.floor(target * eased);

        if (progress < 1) requestAnimationFrame(animate);
        else number.textContent = target;
      };

      requestAnimationFrame(animate);
    });

    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.45 });

document.querySelectorAll('.stats').forEach((el) => countObserver.observe(el));

if (window.matchMedia('(hover: hover)').matches) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursor.style.opacity = '1';
  });

  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };

  renderCursor();

  document.querySelectorAll('a, button, .magnetic, .tilt').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  document.querySelectorAll('.orb').forEach((orb, index) => {
    const speed = (index + 1) * 0.035;
    orb.style.transform = `translateY(${offset * speed}px)`;
  });
}, { passive: true });
