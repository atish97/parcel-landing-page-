document.addEventListener('DOMContentLoaded', () => {
  /* ================= NAVBAR SCROLL STATE ================= */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ================= SCROLL REVEAL OBSERVER ================= */
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ================= ANIMATED STAT COUNTERS ================= */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        const updateCount = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.max(1, Math.round(eased * target));
          el.textContent = `${current}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${target}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        statsObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  statNumbers.forEach((el) => statsObserver.observe(el));

  /* ================= TOAST HELPER ================= */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  /* ================= HERO TESTIMONIAL CAROUSEL ================= */
  const testimonials = [
    {
      name: 'Nadia Rahman',
      quote:
        'Same-day pickups have cut our fulfillment time in half. Every customer gets live tracking links automatically.',
      avatar: 'parcel-assets/avatar-1.png',
    },
    {
      name: 'Tanvir Ahmed',
      quote:
        'Reliable, transparent, and super fast. Our e-commerce returns and dispatches have never been smoother.',
      avatar: 'parcel-assets/avatar-2.png',
    },
    {
      name: 'Arif Hasan',
      quote:
        'We use their delivery service daily and every parcel reaches on time. The tracking system is very smooth and reliable from pickup to delivery.',
      avatar: 'parcel-assets/arif-avatar-591b23.png',
    },
    {
      name: 'Sadia Islam',
      quote:
        'Doorstep pickup right on schedule and zero damaged packages across 500+ monthly shipments.',
      avatar: 'parcel-assets/avatar-3.png',
    },
    {
      name: 'Rafiq Chowdhury',
      quote:
        'Route optimization saved our team hours every week. Best logistics partner we have worked with.',
      avatar: 'parcel-assets/arif-avatar-591b23.png',
    },
  ];

  const tCard = document.getElementById('testimonialCard');
  const tName = document.getElementById('testimonialName');
  const tQuote = document.getElementById('testimonialQuote');
  const tAvatar = document.getElementById('testimonialAvatar');
  const tDots = document.querySelectorAll('#testimonialDots .t-dot');
  let currentTIndex = 2;

  function setTestimonial(index) {
    if (!tCard || index === currentTIndex) return;
    currentTIndex = index;
    tDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    tCard.classList.add('switching');
    setTimeout(() => {
      const item = testimonials[index];
      tName.textContent = item.name;
      tQuote.textContent = item.quote;
      tAvatar.src = item.avatar;
      tAvatar.alt = item.name;
      tCard.classList.remove('switching');
    }, 180);
  }

  tDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      setTestimonial(idx);
    });
  });

  setInterval(() => {
    const next = (currentTIndex + 1) % testimonials.length;
    setTestimonial(next);
  }, 5500);

  /* ================= HERO VIDEO PREVIEW BUTTON ================= */
  const videoPreviewBtn = document.getElementById('openVideoPreviewBtn');
  if (videoPreviewBtn) {
    videoPreviewBtn.addEventListener('click', () => {
      showToast('Live Courier Feed: Parcel #2xd455xpa is 12 mins away from destination.');
    });
  }

  /* ================= EARNINGS PERIOD TOGGLE ================= */
  const earningsData = [
    {
      label: 'This Week',
      amount: '$3,450',
      delta: '+3.5%',
      bars: [30, 20, 12, 26, 17, 24, 28, 13, 21, 26, 17, 12, 24, 17, 30, 12, 26, 17, 24, 32],
    },
    {
      label: 'This Month',
      amount: '$14,820',
      delta: '+12.4%',
      bars: [18, 26, 22, 30, 28, 16, 32, 24, 27, 19, 30, 22, 26, 29, 20, 25, 31, 24, 28, 34],
    },
    {
      label: 'This Year',
      amount: '$168,900',
      delta: '+28.1%',
      bars: [22, 25, 28, 24, 30, 27, 32, 29, 26, 31, 34, 28, 30, 32, 33, 29, 34, 31, 33, 34],
    },
  ];
  let earningsIdx = 0;
  const earningsBtn = document.getElementById('earningsPeriodBtn');
  const earningsPeriodText = document.getElementById('earningsPeriodText');
  const earningsAmount = document.getElementById('earningsAmount');
  const earningsDelta = document.getElementById('earningsDelta');
  const earningsBars = document.querySelectorAll('#earningsBars .bar');

  if (earningsBtn) {
    earningsBtn.addEventListener('click', () => {
      earningsIdx = (earningsIdx + 1) % earningsData.length;
      const data = earningsData[earningsIdx];
      earningsPeriodText.textContent = data.label;
      earningsAmount.textContent = data.amount;
      earningsDelta.textContent = data.delta;
      earningsBars.forEach((bar, i) => {
        if (data.bars[i] !== undefined) {
          bar.style.height = `${data.bars[i]}px`;
        }
      });
    });
  }

  /* ================= INTERACTIVE FEATURE TAGS ================= */
  const featureTags = document.querySelectorAll('#bentoTagsCloud .feature-tag');
  featureTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      featureTags.forEach((t) => t.classList.remove('tag-yellow'));
      tag.classList.add('tag-yellow');
      showToast(`Selected capability: ${tag.textContent.trim()}`);
    });
  });

  /* ================= WORKFLOW & BENTO TRACKING ================= */
  const bentoSearchInput = document.getElementById('bentoSearchInput');
  const bentoSearchBtn = document.getElementById('bentoSearchBtn');

  function handleSearch(inputEl) {
    const val = (inputEl?.value || '').trim();
    if (!val) {
      showToast('Enter a tracking ID like #ord-3242 to check live status.');
      return;
    }
    showToast(`Tracking ${val}: In Transit — Estimated arrival today by 6:00 PM`);
  }

  if (bentoSearchBtn && bentoSearchInput) {
    bentoSearchBtn.addEventListener('click', () => handleSearch(bentoSearchInput));
    bentoSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch(bentoSearchInput);
    });
  }

  const wfTrackBtn = document.getElementById('wfTrackBtn');
  const wfTrackInput = document.getElementById('wfTrackInput');
  const wfStatusText = document.getElementById('wfStatusText');
  const wfStepLabel = document.getElementById('wfStepLabel');
  const statuses = ['In transit', 'Out for Delivery', 'Delivered'];
  let statusIdx = 0;

  if (wfTrackBtn && wfTrackInput) {
    wfTrackBtn.addEventListener('click', () => {
      statusIdx = (statusIdx + 1) % statuses.length;
      const nextStatus = statuses[statusIdx];
      wfStatusText.textContent = nextStatus;
      wfStepLabel.textContent = nextStatus === 'In transit' ? 'In Transit' : nextStatus;
      showToast(`Order ${wfTrackInput.value || '#ord-3242'} status: ${nextStatus}`);
    });
  }

  const wfGlassBtn = document.getElementById('wfGlassBtn');
  const wfGlassInput = document.getElementById('wfGlassInput');
  if (wfGlassBtn && wfGlassInput) {
    wfGlassBtn.addEventListener('click', () => handleSearch(wfGlassInput));
    wfGlassInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch(wfGlassInput);
    });
  }

  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ================= SEND A PARCEL BUTTON ================= */
  const openSendModalBtn = document.getElementById('openSendModalBtn');
  if (openSendModalBtn) {
    openSendModalBtn.addEventListener('click', () => {
      const workflowSection = document.getElementById('workflow');
      if (workflowSection) {
        workflowSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
