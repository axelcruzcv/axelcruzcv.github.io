(() => {
  const fallbackCopy = (text) => {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      area.style.pointerEvents = 'none';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      return true;
    } catch (_) {
      return false;
    }
  };

  document.querySelectorAll('.email-action').forEach(link => {
    link.addEventListener('click', () => {
      const email = link.dataset.email || 'axelcruzmachado@gmail.com';

      const confirm = () => {
        const original = link.textContent;
        link.textContent = 'Email copied';
        link.classList.add('action-confirmed');
        setTimeout(() => {
          link.textContent = original;
          link.classList.remove('action-confirmed');
        }, 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(confirm).catch(() => {
          if (fallbackCopy(email)) confirm();
        });
      } else if (fallbackCopy(email)) {
        confirm();
      }
      // Do not preventDefault(): the native mailto action still runs.
    });
  });
})();

/* V05 coherence enhancements. Kept isolated so the original V05 layout remains untouched. */
(() => {
  const isCV = document.body.classList.contains('cv-page');
  const isExperience = document.body.classList.contains('experience-page');
  const base = isCV ? '../' : '';

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = `${base}css/coherence-v1.css`;
  document.head.appendChild(css);

  const transitionTo = (link) => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    link.addEventListener('click', (e) => {
      if (reduced) return;
      e.preventDefault();
      document.body.classList.add('page-leave');
      setTimeout(() => { location.href = link.href; }, 590);
    });
  };

  if (isExperience) {
    const title = document.querySelector('.intro-title');
    if (title && !document.querySelector('.intro-philosophy')) {
      const philosophy = document.createElement('div');
      philosophy.className = 'intro-philosophy';
      philosophy.setAttribute('aria-label', 'Professional philosophy');
      philosophy.innerHTML = `
        <span class="art">Art is where my way of thinking begins.</span>
        <span class="dot">•</span>
        <span class="tech">Tools are the multiplier.</span>
        <span class="dot">•</span>
        <span class="strategy">Strategy turns digital work into real-world outcomes.</span>`;
      title.insertAdjacentElement('afterend', philosophy);

      if (!(window.CSS && CSS.supports('animation-timeline: scroll()'))) {
        const fadeHero = () => {
          const p = Math.min(1, Math.max(0, scrollY / (innerHeight * .72)));
          philosophy.style.opacity = String(1 - p);
          philosophy.style.transform = `translateY(${-10 * p}px)`;
        };
        addEventListener('scroll', fadeHero, { passive:true });
        fadeHero();
      }
    }

    const outcome = document.querySelector('.outcome-inner');
    if (outcome && !document.querySelector('.outcome-inner > .continuation-cta')) {
      const cta = document.createElement('a');
      cta.className = 'continuation-cta';
      cta.href = 'cv/';
      cta.innerHTML = '<span>Continue</span><strong>Professional CV <b aria-hidden="true">→</b></strong>';
      outcome.appendChild(cta);
      transitionTo(cta);
    }
  }

  if (isCV) {
    // The public site offers one downloadable asset only: the finalized ATS PDF.
    document.querySelectorAll('a[download$=".docx"], a[href$=".docx"]').forEach(link => link.remove());
    document.querySelectorAll('a[href$="Axel_Cruz_Professional_CV.pdf"]').forEach(link => {
      link.setAttribute('download', 'Axel_Cruz_Master_CV_Project_Program_Management.pdf');
    });

    const shell = document.querySelector('.cv-shell');
    const closing = document.querySelector('.cv-closing');
    if (shell && closing && !document.querySelector('.cv-loop-cta')) {
      const cta = document.createElement('a');
      cta.className = 'continuation-cta cv-loop-cta';
      cta.href = '../';
      cta.innerHTML = '<span>Continue the experience</span><strong>Who I Am <b aria-hidden="true">→</b></strong>';
      closing.insertAdjacentElement('afterend', cta);
      transitionTo(cta);
    }
  }
})();