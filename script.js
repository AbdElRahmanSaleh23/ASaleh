 /* ── PARTICLES ── */
    (function () {
      const c = document.getElementById('particles-canvas');
      const ctx = c.getContext('2d');
      let pts = [];
      function resize() { c.width = innerWidth; c.height = innerHeight; }
      resize(); window.addEventListener('resize', resize);
      for (let i = 0; i < 90; i++) pts.push({
        x: Math.random() * innerWidth, y: Math.random() * innerHeight,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.5 + 0.2
      });
      function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        pts.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > c.width) p.vx *= -1;
          if (p.y < 0 || p.y > c.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(61,200,255,${p.o})` : `rgba(36,133,245,${p.o * 0.5})`;
          ctx.fill();
        });
        // connect nearby
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = isDark
                ? `rgba(36,133,245,${0.12 * (1 - d / 120)})`
                : `rgba(36,133,245,${0.07 * (1 - d / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(draw);
      }
      draw();
    })();

    /* ── THEME ── */
    function toggleTheme() {
      const h = document.documentElement;
      const isDark = h.getAttribute('data-theme') === 'dark';
      h.setAttribute('data-theme', isDark ? 'light' : 'dark');
      document.getElementById('ti').textContent = isDark ? '🌙' : '☀️';
      document.getElementById('tl').textContent = isDark ? 'Dark Mode' : 'Light Mode';
    }

    /* ── SCROLL REVEAL ── */
    const revEls = document.querySelectorAll('.reveal');
    const revIO = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    revEls.forEach(e => revIO.observe(e));

    /* ── SKILL BARS ── */
    const barIO = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.sb-fill').forEach(b => {
            b.style.width = b.dataset.w + '%';
          });
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skills-bars').forEach(e => barIO.observe(e));

    /* ── EXP TABS ── */
    const tabs = document.querySelectorAll('.exp-tab');
    const panels = document.querySelectorAll('.exp-panel');
    function switchTab(i) {
      tabs.forEach((t, j) => t.classList.toggle('active', j === i));
      panels.forEach((p, j) => {
        p.classList.toggle('active', j === i);
        if (j === i) { p.classList.remove('visible'); setTimeout(() => p.classList.add('visible'), 10); }
      });
    }

    /* ── MODALS ── */
    const PD = {
      lims: {
        title: 'EMCO — Laboratory ERP System', type: 'ERP · Enterprise · Saudi Arabia (Remote)',
        desc: `A full-scale Enterprise Resource Planning system designed for laboratories. Covers the complete lab cycle — sample registration, testing workflows, and result reporting — plus integrated Sales, Accounting, Quality Management, and Inventory modules.\n\nKey technical achievements include multi-module scalable architecture ensuring high data consistency, and background job processing via Hangfire for asynchronous notifications, automated email delivery, and generation of large financial and laboratory reports without blocking the main thread.`,
        tech: ['ASP.NET Core', 'Web API', 'SQL Server', 'Hangfire', 'EF Core', 'Clean Architecture', 'LINQ', 'AutoMapper']
      },
      naqsh: {
        title: 'Naqsh — E-Commerce Platform', type: 'E-Commerce · Saudi Arabia',
        desc: `Full-featured e-commerce platform with smart shopping cart, complete checkout, and full order lifecycle management.\n\nPayment gateways: Moyasar, Tabby (BNPL), Tamara (BNPL), and Apple Pay. SMS notifications via Dreams.sa, shipping via Thabit, automated invoicing, and full refund workflows.`,
        tech: ['ASP.NET Core', 'Web API', 'SQL Server', 'Moyasar', 'Tabby', 'Tamara', 'Apple Pay', 'Dreams.sa SMS', 'Thabit Shipping', 'EF Core']
      },
      sana: {
        title: 'Sana Space — Events & Booking Platform', type: 'Events & Booking · Saudi Arabia',
        desc: `Backend for a multi-city events platform managing the full event lifecycle. Includes booking/reservation system handling paid and free events, payment processing via PayTabs and Apple Pay, comprehensive attendee management, and capacity tracking.`,
        tech: ['ASP.NET Core', 'Web API', 'SQL Server', 'PayTabs', 'Apple Pay', 'Clean Architecture', 'EF Core']
      },
      sam: {
        title: 'Sam Store — Auto Parts E-Commerce', type: 'E-Commerce · Auto Parts',
        desc: `Specialized e-commerce for auto parts with intelligent multi-level product filtering by car brand, model, and year. Features a large-inventory catalog management system, full shopping cart and order management, and Paymob payment integration.`,
        tech: ['ASP.NET Core', 'Web API', 'SQL Server', 'Paymob', 'EF Core', 'LINQ', 'Clean Architecture']
      },
      amazon: {
        title: 'Amazon Clone — ITI Graduation Project', type: 'Full Stack · Personal Project',
        desc: `Full-stack Amazon clone demonstrating mastery of backend and frontend development. RESTful API with N-Tier Architecture, Microsoft Identity, JWT authorization, Generic Repository Pattern, EF Core with LINQ, Redis in-memory caching, Stripe payment integration, and Angular frontend with TypeScript.`,
        tech: ['Web API', 'N-Tier Architecture', 'Microsoft Identity', 'JWT', 'EF Core', 'LINQ', 'Redis', 'Stripe', 'Angular', 'TypeScript', 'HTML5', 'CSS3']
      },
      talabat: {
        title: 'Talabat E-Commerce — ASP.NET Web API', type: 'REST API · Architecture Showcase',
        desc: `Production-grade REST API showcasing advanced architectural patterns: Onion Architecture, Generic Repository Pattern, Unit of Work, and Specification Design Pattern for flexible querying. Also features Redis caching, JWT authentication, and Stripe payment integration.`,
        tech: ['ASP.NET Web API', 'Onion Architecture', 'EF Core', 'LINQ', 'Generic Repository', 'Unit of Work', 'Specification Pattern', 'Redis', 'JWT', 'Stripe']
      }
    };

    function openModal(id) {
      const p = PD[id]; if (!p) return;
      const tech = p.tech.map(t => `<span class="tp">${t}</span>`).join('');
      document.getElementById('mbox').innerHTML = `
    <div class="modal-h">
      <div>
        <div class="proj-type" style="margin-bottom:5px">${p.type}</div>
        <div style="font-family:'Rajdhani',sans-serif;font-size:1.5rem;font-weight:700">${p.title}</div>
      </div>
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="proj-tech-row" style="margin-bottom:1.2rem">${tech}</div>
    <div class="modal-desc">${p.desc.replace(/\n\n/g, '<br><br>')}</div>
  `;
      document.getElementById('moverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeModal(e) {
      if (!e || e.target === document.getElementById('moverlay')) {
        document.getElementById('moverlay').classList.remove('open');
        document.body.style.overflow = '';
      }
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });