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

      // Do not preventDefault(): the standard mailto: action still runs.
      // If the visitor has no configured mail client, the address is copied
      // to the clipboard as a reliable fallback.
    });
  });
})();