(function () {

  /* ── 2. Console message ── */
  console.log('%c  Yash Choudhary.  ', 'background:#0a0a0a;color:#fff;font-size:16px;font-weight:bold;padding:6px 12px;border-radius:4px;');
  console.log('%cLooking for the source? → https://github.com/always-yash', 'color:#0a0a0a;font-family:monospace;font-size:12px;');
  console.log('%cPS: hidden easter eggs await. Good luck.', 'color:#63636b;font-family:monospace;font-size:12px;');

  /* ── 3. Click logo x5 fast → spin + tooltip ── */
  const navLogo = document.getElementById('navLogo');
  if (navLogo) {
    let clickCount = 0;
    let clickTimer = null;
    let tooltip = null;

    navLogo.addEventListener('click', function (e) {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(function () { clickCount = 0; }, 900);

      if (clickCount >= 5) {
        clickCount = 0;
        e.preventDefault();
        navLogo.classList.add('egg-spin');
        setTimeout(function () { navLogo.classList.remove('egg-spin'); }, 650);

        if (!tooltip) {
          tooltip = document.createElement('div');
          tooltip.className = 'egg-logo-tip';
          tooltip.textContent = "okay, you found one! Now try finding the rests.";
          document.body.appendChild(tooltip);
        }
        const rect = navLogo.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 10) + 'px';
        tooltip.classList.add('show');
        setTimeout(function () { tooltip.classList.remove('show'); }, 2200);
      }
    });
  }

  /* ── 4. Type "sudo" → fake terminal command ── */
  (function () {
    const target = 'sudo';
    let buffer = '';
    const overlay = document.getElementById('eggTerminal');
    const textEl = document.getElementById('eggTerminalText');
    const fullCmd = "sudo scan --there is lots to explore --keep searchin'";
    let typing = false;

    document.addEventListener('keydown', function (e) {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer === target && !typing && overlay) {
        typing = true;
        buffer = '';
        overlay.classList.add('show');
        textEl.textContent = '';
        let i = 0;
        const typeInterval = setInterval(function () {
          textEl.textContent += fullCmd[i];
          i++;
          if (i >= fullCmd.length) {
            clearInterval(typeInterval);
            setTimeout(function () {
              overlay.classList.remove('show');
              typing = false;
            }, 1600);
          }
        }, 55);
      }
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        overlay.classList.remove('show');
        typing = false;
      });
    }
  })();

  /* ── 5. Hold Shift → dotted cursor trail ── */
  (function () {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    let shiftHeld = false;
    let lastDrop = 0;

    document.addEventListener('keydown', function (e) { if (e.key === 'Shift') shiftHeld = true; });
    document.addEventListener('keyup', function (e) { if (e.key === 'ShiftKey') shiftHeld = false; });

    document.addEventListener('mousemove', function (e) {
      if (!shiftHeld) return;
      const now = Date.now();
      if (now - lastDrop < 35) return;
      lastDrop = now;

      const dot = document.createElement('span');
      dot.className = 'egg-trail-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      document.body.appendChild(dot);
      setTimeout(function () { dot.remove(); }, 450);
    });
  })();

/* ── 6. Reached bottom + waited → end message vertical push ── */
/* ── 6. Reached bottom → push egg msg UP → wait 3s → push location text UP ── */
  (function () {
    const slot = document.querySelector('.footer-msg-slot');
    if (!slot) return;
    let timer = null;
    let sequenceTriggered = false; // Ensures it runs once and stays permanently

    window.addEventListener('scroll', function () {
      if (sequenceTriggered) return;

      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 40;
      if (atBottom) {
        if (!timer) {
          timer = setTimeout(function () {
            slot.classList.add('active'); // Step 1: Egg msg pushes up into view
            
            setTimeout(function () {
              slot.classList.remove('active');
              slot.classList.add('reset-up'); // Step 2: Location text pushes up into view
              sequenceTriggered = true; // Locks state permanently
            }, 3000); // 3-second delay
            
          }, 1200);
        }
      } else {
        clearTimeout(timer);
        timer = null;
      }
    }, { passive: true });
  })();

  /* ── 7. Double-click footer name → boot log ── */
  (function () {
    const nameEl = document.getElementById('footerName');
    const bootEl = document.getElementById('eggBoot');
    if (!nameEl || !bootEl) return;

    const lines = [
      'booting portfolio_os v1.0 ...',
      '[ok] loading ui frameworks',
      '[ok] initializing network stack',
      '[ok] mounting design systems',
      '[ok] linking github feeds',
      '[ok] syncing projects: Artisaan, Intent-tab, SkyTel',
      '[ok] compiling ui components',
      '[warn] caffeine levels critical',
      '[ok] caffeine restocked',
      '',
      'portfolio_os ready. press any key to exit.'
    ];

    nameEl.addEventListener('dblclick', function () {
      bootEl.innerHTML = '';
      bootEl.classList.add('show');
      document.body.style.overflow = 'hidden';

      lines.forEach(function (line, i) {
        setTimeout(function () {
          const div = document.createElement('div');
          div.className = 'egg-boot__line';
          div.textContent = line || '\u00A0';
          bootEl.appendChild(div);
        }, i * 180);
      });

      function exitBoot() {
        bootEl.classList.remove('show');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', exitBoot);
        bootEl.removeEventListener('click', exitBoot);
      }
      setTimeout(function () {
        document.addEventListener('keydown', exitBoot);
        bootEl.addEventListener('click', exitBoot);
      }, lines.length * 180 + 200);
    });
  })();

  /* ── 8. Type "invert" → toggle inverted colors ── */
  (function () {
    const target = 'invert';
    let buffer = '';

    document.addEventListener('keydown', function (e) {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer === target) {
        buffer = '';
        document.documentElement.classList.toggle('egg-inverted');
      }
    });
  })();

  /* ── 9. Rapid click x10 → mono particle burst ── */
  (function () {
    let clicks = 0;
    let resetTimer = null;

    document.addEventListener('click', function (e) {
      clicks++;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () { clicks = 0; }, 1200);

      if (clicks >= 10) {
        clicks = 0;
        const count = 14;
        for (let i = 0; i < count; i++) {
          const p = document.createElement('span');
          p.className = 'egg-particle';
          const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
          const dist = 40 + Math.random() * 60;
          p.style.left = e.clientX + 'px';
          p.style.top = e.clientY + 'px';
          p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
          p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
          if (Math.random() > 0.6) p.style.borderRadius = '50%';
          document.body.appendChild(p);
          setTimeout(function () { p.remove(); }, 700);
        }
      }
    });
  })();

  /* ── 10. Type "whoami" → terminal-style overlay ── */
  (function () {
    const target = 'whoami';
    let buffer = '';
    const overlay = document.getElementById('eggTerminal');
    const textEl = document.getElementById('eggTerminalText');
    const whoamiLines = [
      'yash choudhary',
      "systems designer & engineer · b.tech cse '28"
    ];
    let typing = false;

    document.addEventListener('keydown', function (e) {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer === target && !typing && overlay) {
        typing = true;
        buffer = '';
        overlay.classList.add('show');
        textEl.innerHTML = '';
        const full = whoamiLines.join('\n');
        let i = 0;
        const typeInterval = setInterval(function () {
          textEl.innerHTML = full.slice(0, i + 1).replace(/\n/g, '<br>');
          i++;
          if (i >= full.length) {
            clearInterval(typeInterval);
            setTimeout(function () {
              overlay.classList.remove('show');
              typing = false;
            }, 1800);
          }
        }, 40);
      }
    });
  })();

  /* ── 11. Project card long-press (1.5s) → flip reveals dev note ── */
  (function () {
    const notes = {
      'Artisaan': "built while learning full-stack dev. half the automation came from refusing to click the same 5 buttons every day.",
      'Intent-tab': "personal productivity experiment. i built this when i needed a focused new tab that doesn't distract.",
      'SkyTel Solutions': "a challenge in architecture - building a telecom platform from scratch was wild.",
      'TPMS Dashboard': "a fleecaa project. the real work was lost to a sih ended collaboration :(",
      'Travel interface': "soon to be updated. stay tuned for more exciting projects!",
    };

    document.querySelectorAll('.project-card, .swiper-slide .card').forEach(function (card) {
      const indexEl = card.querySelector('.project-card__index');
      const tagEl = card.querySelector('.card-tag');
      const titleEl = card.querySelector('.card-title');
      
      const key = indexEl ? indexEl.textContent.trim() : (tagEl ? tagEl.textContent.trim() : null);
      const note = key && notes[key];
      if (!note) return;

      let pressTimer = null;
      let flipEl = null;

      function showFlip() {
        if (!flipEl) {
          flipEl = document.createElement('div');
          flipEl.className = 'egg-card-flip mono';
          flipEl.textContent = note;
          card.appendChild(flipEl);
        }
        requestAnimationFrame(function () { flipEl.classList.add('show'); });
      }
      function hideFlip() {
        if (flipEl) flipEl.classList.remove('show');
      }

      card.addEventListener('mousedown', function () {
        pressTimer = setTimeout(showFlip, 1500);
      });
      ['mouseup', 'mouseleave'].forEach(function (evt) {
        card.addEventListener(evt, function () {
          clearTimeout(pressTimer);
          hideFlip();
        });
      });
    });
  })();

  /* ── 12. Type "yash" → personal easter egg popup ── */
  (function () {
    const target = 'yash';
    let buffer = '';
    let popup = null;

    document.addEventListener('keydown', function (e) {
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer === target) {
        buffer = '';
        if (!popup) {
          popup = document.createElement('div');
          popup.className = 'egg-logo-tip egg-yash-tip';
          popup.textContent = "hi. you found the code. 🤍";
          document.body.appendChild(popup);
        }
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%,-50%)';
        popup.classList.add('show');
        setTimeout(function () { popup.classList.remove('show'); }, 2600);
      }
    });
  })();

  /* ── 13. Plain Arrow Up/Down → scroll to next/prev section ── */
  (function () {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (!sections.length) return;
    const nav = document.getElementById('nav');

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 72;
      const scrollY = window.scrollY;

      let currentIdx = 0;
      sections.forEach(function (s, i) {
        if (scrollY >= s.offsetTop - navHeight - 60) currentIdx = i;
      });

      const targetIdx = e.key === 'ArrowDown'
        ? Math.min(currentIdx + 1, sections.length - 1)
        : Math.max(currentIdx - 1, 0);

      const top = sections[targetIdx].getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  })();

  /* ── 14. Right-click → custom minimal context menu ── */
  (function () {
    let menu = null;

    function closeMenu() {
      if (menu) { menu.remove(); menu = null; }
    }

    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      closeMenu();

      menu = document.createElement('div');
      menu.className = 'egg-context-menu mono';

      const items = [
        { label: 'View source on GitHub ↗', action: function () { window.open('https://github.com/always-yash', '_blank', 'noopener'); } },
        { label: 'Say hi ↗', action: function () { window.location.href = 'mailto:always.yash@gmail.com'; } }
      ];

      items.forEach(function (item) {
        const el = document.createElement('div');
        el.className = 'egg-context-menu__item';
        el.textContent = item.label;
        el.addEventListener('click', function () {
          item.action();
          closeMenu();
        });
        menu.appendChild(el);
      });

      document.body.appendChild(menu);
      const mw = menu.offsetWidth;
      const mh = menu.offsetHeight;
      menu.style.left = Math.min(e.clientX, window.innerWidth - mw - 12) + 'px';
      menu.style.top = Math.min(e.clientY, window.innerHeight - mh - 12) + 'px';
      requestAnimationFrame(function () { menu.classList.add('show'); });
    });

    document.addEventListener('click', closeMenu);
    window.addEventListener('scroll', closeMenu, { passive: true });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  })();

  /* ── 15. Type "eggs" → cheat sheet of hints ── */
  (function () {
    const target = 'eggs';
    let buffer = '';
    let sheet = null;

    const hints = [
      'console — check the console on load',
      'nav logo — click it 5 times, fast',
      '"sudo" — type it anywhere',
      'shift + mouse — hold and move (desktop)',
      'scroll to the bottom — and wait a beat',
      'footer name — double-click it',
      '"invert" — type it anywhere (again to undo)',
      '10 clicks — click anywhere, fast, 10 times',
      '"whoami" — type it anywhere',
      'project cards — press and hold one in the carousel',
      '"yash" — type it anywhere',
      'arrow up/down — jump between sections',
      'right-click — anywhere',
      'this list — type "eggs" again to close'
    ];

    document.addEventListener('keydown', function (e) {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer !== target) return;
      buffer = '';

      if (sheet) {
        sheet.classList.remove('show');
        setTimeout(function () { if (sheet) { sheet.remove(); sheet = null; } }, 300);
        return;
      }

      sheet = document.createElement('div');
      sheet.className = 'egg-cheatsheet mono';
      const box = document.createElement('div');
      box.className = 'egg-cheatsheet__box';
      const title = document.createElement('div');
      title.className = 'egg-cheatsheet__title';
      title.textContent = 'egg hints — type "eggs" again to close';
      box.appendChild(title);
      hints.forEach(function (h) {
        const line = document.createElement('div');
        line.className = 'egg-cheatsheet__line';
        line.textContent = h;
        box.appendChild(line);
      });
      sheet.appendChild(box);
      sheet.addEventListener('click', function (e) {
        if (e.target === sheet) sheet.classList.remove('show');
      });
      document.body.appendChild(sheet);
      requestAnimationFrame(function () { sheet.classList.add('show'); });
    });
  })();

})();