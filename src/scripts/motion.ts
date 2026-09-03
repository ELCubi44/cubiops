function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isFinePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

export function initMotion(): void {
  initReveal();
  if (prefersReducedMotion()) return;

  initScrollProgress();
  if (isFinePointer()) {
    initCursor();
    initSpotlight();
    initParallax();
    initTilt();
    initMagnetic();
  }
}

function initReveal(): void {
  const nodes = document.querySelectorAll<HTMLElement>('.reveal, .card, .problem, .step, .faq, .about, .projects-empty, .case-logo, .form');
  if (prefersReducedMotion() || !nodes.length || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-in'));
    return;
  }

  document.documentElement.classList.add('js-motion');

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((node, index) => {
    node.style.setProperty('--delay', `${Math.min(index % 6, 5) * 70}ms`);
    observer.observe(node);
  });
}

function initScrollProgress(): void {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(Math.max(value, 0), 1)})`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initCursor(): void {
  const cursor = document.querySelector<HTMLElement>('[data-cursor]');
  const ring = document.querySelector<HTMLElement>('[data-cursor-ring]');
  if (!cursor || !ring) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;
  let visible = false;

  const show = () => {
    if (visible) return;
    visible = true;
    document.documentElement.classList.add('has-pointer-motion');
    cursor.classList.add('is-on');
    ring.classList.add('is-on');
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      show();
    },
    { passive: true },
  );

  const tick = () => {
    rx += (x - rx) * 0.18;
    ry += (y - ry) * 0.18;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  document.querySelectorAll('a, button, summary, input, textarea, select').forEach((node) => {
    node.addEventListener('pointerenter', () => ring.classList.add('is-hot'));
    node.addEventListener('pointerleave', () => ring.classList.remove('is-hot'));
  });
}

function initSpotlight(): void {
  const hero = document.querySelector<HTMLElement>('[data-spotlight]');
  if (!hero) return;

  hero.addEventListener(
    'pointermove',
    (event) => {
      const rect = hero.getBoundingClientRect();
      const mx = ((event.clientX - rect.left) / rect.width) * 100;
      const my = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', `${mx}%`);
      hero.style.setProperty('--my', `${my}%`);
    },
    { passive: true },
  );
}

function initParallax(): void {
  const visual = document.querySelector<HTMLElement>('[data-parallax]');
  if (!visual) return;

  visual.addEventListener(
    'pointermove',
    (event) => {
      const rect = visual.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      visual.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    },
    { passive: true },
  );

  visual.addEventListener('pointerleave', () => {
    visual.style.transform = '';
  });
}

function initTilt(): void {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener(
      'pointermove',
      (event) => {
        const rect = card.getBoundingClientRect();
        const dx = (event.clientX - rect.left) / rect.width - 0.5;
        const dy = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateY(-4px)`;
      },
      { passive: true },
    );
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

function initMagnetic(): void {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((button) => {
    button.addEventListener(
      'pointermove',
      (event) => {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        button.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
      },
      { passive: true },
    );
    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
    });
  });
}
