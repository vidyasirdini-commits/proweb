/**
 * Modern High-Performance Computer Engineering Portfolio
 * Interactive Controllers: Terminal Emulator, Skill Filtering, Modal, Form Validation, Theme Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkillFiltering();
  initTerminal();
  initProjectModals();
  initContactForm();
  initClipboardButtons();
  initStatCounters();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Switcher
   ========================================================================== */
function initTheme() {
  const currentTheme = localStorage.getItem('portfolio-theme') || 'cyan';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeSelectors = document.querySelectorAll('.theme-btn');
  themeSelectors.forEach(btn => {
    const theme = btn.getAttribute('data-theme-choice');
    if (theme === currentTheme) {
      btn.classList.add('ring-2', 'ring-white');
    }

    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-theme-choice');
      document.documentElement.setAttribute('data-theme', selected);
      localStorage.setItem('portfolio-theme', selected);

      themeSelectors.forEach(b => b.classList.remove('ring-2', 'ring-white'));
      btn.classList.add('ring-2', 'ring-white');

      showToast(`Switched accent theme to ${selected.toUpperCase()}`, 'info');
    });
  });
}

/* ==========================================================================
   2. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Back to top button listener
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   3. Scroll Spy for Navbar
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
        link.classList.remove('text-slate-400');
      }
    });
  });
}

/* ==========================================================================
   4. Technical Skill Matrix Filtering & Search
   ========================================================================== */
function initSkillFiltering() {
  const filterChips = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  const searchInput = document.getElementById('skill-search-input');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    skillCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const skillName = card.getAttribute('data-skill').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = skillName.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active-chip'));
      chip.classList.add('active-chip');
      activeCategory = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* ==========================================================================
   5. Interactive Terminal / Dev Console Emulator
   ========================================================================== */
function initTerminal() {
  const inputEl = document.getElementById('terminal-input');
  const outputEl = document.getElementById('terminal-output');
  const bodyEl = document.getElementById('terminal-body');
  const quickCmdBtns = document.querySelectorAll('.terminal-quick-btn');

  if (!inputEl || !outputEl) return;

  const commandHistory = [];
  let historyIndex = -1;

  const systemCommands = {
    help: () => `
<div class="text-slate-300 space-y-1">
  <div class="text-cyan-400 font-semibold mb-1">Available System Commands:</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">help</span> - Display list of available commands</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">about</span> - Background, education & engineering ethos</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">skills</span> - Breakdown of systems & full-stack matrix</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">projects</span> - Highlights of featured repositories</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">education</span> - University, graduation, and coursework</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">contact</span> - Direct channels to get in touch</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">neofetch</span> - Render developer machine & system profile</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">theme [name]</span> - Change theme (cyan, indigo, emerald, violet)</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">cat resume</span> - View ASCII summary of resume</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">sudo [cmd]</span> - Execute command with elevated permissions</div>
  <div><span class="text-cyan-300 w-28 inline-block font-mono">clear</span> - Clear console output</div>
</div>`,

    whoami: () => `
<div class="text-slate-300">
  <p><span class="text-cyan-400 font-semibold">visitor@eng-workstation</span> (guest session: full read-only permissions)</p>
  <p class="text-slate-400 text-xs mt-1">Host: x86_64 Linux 6.8.0-ce-hardened #1 SMP PREEMPT_DYNAMIC</p>
</div>`,

    about: () => `
<div class="text-slate-300 space-y-2">
  <p class="text-cyan-300 font-semibold">⚡ Vidya — Computer Engineering & Full-Stack Developer</p>
  <p class="text-slate-300">I specialize at the crossroads of low-level hardware architecture and scalable modern web backends. Whether profiling cache misses in a C++ RISC-V simulator, designing Raft consensus clusters in Go, or architecting reactive TypeScript frontends, I build software engineered for speed, correctness, and fault tolerance.</p>
  <p class="text-xs text-slate-400">Status: <span class="text-emerald-400 font-semibold">Seeking Summer 2026/2027 Software Engineering & Systems Roles.</span></p>
</div>`,

    education: () => `
<div class="text-slate-300 space-y-2">
  <div class="text-cyan-400 font-semibold">🎓 Degree & Academic Credentials:</div>
  <div>
    <span class="text-white font-medium">B.S. in Computer Engineering</span> — University of California / Top Tier Tech
    <div class="text-xs text-slate-400">Expected Graduation: May 2026 | GPA: 3.92 / 4.00</div>
  </div>
  <div class="text-xs space-y-1">
    <div class="text-slate-300 font-medium">Core Courses Mastered:</div>
    <div class="text-slate-400">• Operating Systems & Concurrency (Virtual memory, pthreads, IPC)</div>
    <div class="text-slate-400">• Computer Architecture & Microprocessors (Pipelining, branch prediction, RISC-V)</div>
    <div class="text-slate-400">• Distributed Systems & Cloud Infrastructure (Raft, Paxos, gRPC)</div>
    <div class="text-slate-400">• Algorithms, Graph Theory & Advanced Data Structures</div>
  </div>
</div>`,

    skills: () => `
<div class="text-slate-300 space-y-2">
  <div class="text-cyan-400 font-semibold">🛠️ Technical Skill Matrix:</div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
    <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
      <span class="text-cyan-300 font-semibold">Low-Level & Systems:</span>
      <div class="text-slate-300 mt-1">C++, C, Go, Linux/POSIX, x86/RISC-V Assembly, Docker, GDB, Valgrind, Make/CMake</div>
    </div>
    <div class="bg-slate-900/80 p-2 rounded border border-slate-800">
      <span class="text-indigo-300 font-semibold">Full-Stack & Cloud:</span>
      <div class="text-slate-300 mt-1">TypeScript, React, Next.js, Node.js, Express, PostgreSQL, Redis, REST & gRPC</div>
    </div>
  </div>
</div>`,

    projects: () => `
<div class="text-slate-300 space-y-2">
  <div class="text-cyan-400 font-semibold">🚀 Highlighted Featured Projects:</div>
  <div class="text-xs space-y-2">
    <div>
      <span class="text-cyan-300 font-semibold font-mono">1. AetherKV</span> [Go, Raft, gRPC, Docker]
      <div class="text-slate-400">Distributed fault-tolerant key-value store with sub-millisecond p99 latencies.</div>
    </div>
    <div>
      <span class="text-cyan-300 font-semibold font-mono">2. OmniSync</span> [TypeScript, React, WebSockets, CRDTs]
      <div class="text-slate-400">Real-time collaborative canvas & code workspace with decentralized conflict resolution.</div>
    </div>
    <div>
      <span class="text-cyan-300 font-semibold font-mono">3. SpectraVM</span> [C++20, WebAssembly, RISC-V RV32I]
      <div class="text-slate-400">Cycle-accurate 5-stage pipelined processor emulator and interactive cache profiler.</div>
    </div>
    <div>
      <span class="text-cyan-300 font-semibold font-mono">4. DevPulse</span> [Python, FastAPI, Next.js, TimescaleDB]
      <div class="text-slate-400">Developer cloud telemetry SaaS monitoring microservice health & anomalies in real time.</div>
    </div>
  </div>
</div>`,

    contact: () => `
<div class="text-slate-300 space-y-1">
  <div class="text-cyan-400 font-semibold mb-1">📬 Communication Channels:</div>
  <div><span class="text-slate-400 w-24 inline-block font-mono">Email:</span> <a href="mailto:vidya.eng@example.com" class="text-cyan-300 underline">vidya.eng@example.com</a></div>
  <div><span class="text-slate-400 w-24 inline-block font-mono">GitHub:</span> <a href="https://github.com" target="_blank" class="text-cyan-300 underline">github.com/vidya-dev</a></div>
  <div><span class="text-slate-400 w-24 inline-block font-mono">LinkedIn:</span> <a href="https://linkedin.com" target="_blank" class="text-cyan-300 underline">linkedin.com/in/vidya-dev</a></div>
  <div><span class="text-slate-400 w-24 inline-block font-mono">LeetCode:</span> <a href="https://leetcode.com" target="_blank" class="text-cyan-300 underline">leetcode.com/vidya_dev</a></div>
</div>`,

    email: () => {
      copyToClipboardText('vidya.eng@example.com');
      return `<div class="text-emerald-400">✓ Direct email [vidya.eng@example.com] copied to clipboard!</div>`;
    },

    neofetch: () => `
<div class="flex flex-col md:flex-row gap-4 font-mono text-xs">
  <div class="text-cyan-400 select-none whitespace-pre leading-tight">
       _/_/_/   _/_/_/_/ 
    _/         _/        
   _/         _/_/_/     
  _/         _/          
   _/_/_/   _/_/_/_/     
   [CE / FULL-STACK]     
  </div>
  <div class="space-y-1 text-slate-300">
    <div><span class="text-cyan-300 font-semibold">visitor</span>@<span class="text-indigo-400 font-semibold">vidya-station</span></div>
    <div class="text-slate-500">--------------------------</div>
    <div><span class="text-cyan-400 font-medium">OS:</span> Arch Linux x86_64 & FreeRTOS</div>
    <div><span class="text-cyan-400 font-medium">Host:</span> ThinkPad P1 Gen 6 / Custom Rig</div>
    <div><span class="text-cyan-400 font-medium">Kernel:</span> 6.8.0-ce-zenith</div>
    <div><span class="text-cyan-400 font-medium">Uptime:</span> 3.5 yrs in B.S. CompEng</div>
    <div><span class="text-cyan-400 font-medium">Shell:</span> zsh 5.9 (omz / starship)</div>
    <div><span class="text-cyan-400 font-medium">Architecture:</span> RV32I / x86_64 / ARM64</div>
    <div><span class="text-cyan-400 font-medium">Primary Tools:</span> Neovim, Docker, C++20, React, Go</div>
    <div><span class="text-cyan-400 font-medium">Memory:</span> 32GB DDR5 @ 5600MT/s</div>
  </div>
</div>`,

    cat: (args) => {
      if (!args || args[0] !== 'resume' && args[0] !== 'resume.txt') {
        return `<div class="text-rose-400">cat: ${args ? args[0] : 'file'}: No such file or directory. Try 'cat resume.txt'</div>`;
      }
      return `
<div class="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-300 space-y-2 font-mono">
  <div class="text-cyan-400 font-bold border-b border-slate-800 pb-1">VIDYA — RESUME SNAPSHOT (2026)</div>
  <div><span class="text-white font-medium">Education:</span> B.S. Computer Engineering (GPA: 3.92/4.0)</div>
  <div><span class="text-white font-medium">Proficiencies:</span> C++, Python, TypeScript, Go, React, Linux Systems, Distributed DBs</div>
  <div><span class="text-white font-medium">Experience:</span> Software Engineering Intern @ CloudScale Tech (Low-latency telemetry, Kafka, Go)</div>
  <div><span class="text-white font-medium">Achievements:</span> Top 3% Global LeetCode (Knight), Dean's Honors List (All semesters)</div>
  <div class="pt-2 text-cyan-300">Tip: Click the 'Download Resume' button in the Hero section for the full official PDF.</div>
</div>`;
    },

    sudo: () => `
<div class="text-rose-400">
  [sudo] password for visitor: *********<br>
  visitor is not in the sudoers file. This incident will be reported to root.
</div>`,

    clear: () => {
      outputEl.innerHTML = '';
      return null;
    }
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to history
    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Render command prompt line in output
    const cmdLine = document.createElement('div');
    cmdLine.className = 'flex items-center gap-2 text-slate-200 mt-2';
    cmdLine.innerHTML = `
      <span class="text-emerald-400 font-semibold font-mono">visitor@eng-box</span>
      <span class="text-slate-500 font-mono">:</span>
      <span class="text-cyan-400 font-mono">~</span>
      <span class="text-slate-400 font-mono">$</span>
      <span class="text-white font-mono font-medium">${escapeHtml(trimmed)}</span>
    `;
    outputEl.appendChild(cmdLine);

    // Split args
    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Custom theme command handler
    if (cmd === 'theme') {
      const targetTheme = args[0] ? args[0].toLowerCase() : '';
      const validThemes = ['cyan', 'indigo', 'emerald', 'violet'];
      if (validThemes.includes(targetTheme)) {
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('portfolio-theme', targetTheme);
        renderResponse(`<div class="text-emerald-400">Theme updated to '${targetTheme}'.</div>`);
        showToast(`Theme changed to ${targetTheme.toUpperCase()}`, 'info');
      } else {
        renderResponse(`<div class="text-amber-400">Usage: theme [cyan | indigo | emerald | violet]</div>`);
      }
      return;
    }

    if (systemCommands[cmd]) {
      const res = systemCommands[cmd](args);
      if (res !== null) {
        renderResponse(res);
      }
    } else {
      renderResponse(`
        <div class="text-rose-400 text-xs">
          command not found: <span class="text-white font-semibold">${escapeHtml(cmd)}</span>. 
          Type <span class="text-cyan-300 font-bold underline cursor-pointer" onclick="runQuickCommand('help')">help</span> to view available commands.
        </div>
      `);
    }

    // Auto scroll to bottom
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function renderResponse(htmlContent) {
    const resContainer = document.createElement('div');
    resContainer.className = 'py-1 text-slate-300';
    resContainer.innerHTML = htmlContent;
    outputEl.appendChild(resContainer);
  }

  // Handle enter and history navigation
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = inputEl.value;
      inputEl.value = '';
      executeCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        inputEl.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputEl.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        inputEl.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputEl.value.trim().toLowerCase();
      const candidates = ['help', 'skills', 'projects', 'about', 'education', 'contact', 'clear', 'email', 'neofetch', 'theme', 'sudo', 'cat'];
      const match = candidates.find(c => c.startsWith(current));
      if (match) {
        inputEl.value = match;
      }
    }
  });

  // Quick command buttons
  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        inputEl.value = cmd;
        executeCommand(cmd);
      }
    });
  });

  // Expose helper to run command from click
  window.runQuickCommand = (cmd) => {
    inputEl.value = cmd;
    executeCommand(cmd);
    inputEl.focus();
  };
}

/* ==========================================================================
   6. Project Architecture Deep-Dive Modals
   ========================================================================== */
const projectData = {
  aetherkv: {
    title: "AetherKV — Distributed Fault-Tolerant Key-Value Store",
    tech: ["Go", "Raft Consensus", "gRPC", "Protobuf", "Docker", "Prometheus"],
    problem: "Traditional centralized datastores present a single point of failure and bottleneck when scaled across multi-region environments.",
    solution: "Designed and implemented a distributed, leader-elected Raft consensus key-value cluster in Go. Supports consistent state machine replication, snapshotting, log compaction, dynamic membership reconfiguration, and sub-millisecond p99 read latencies.",
    architecture: `
      • Consensus Engine: Strict Raft implementation with randomized heartbeats (150-300ms) to prevent split votes.
      • Storage Engine: In-memory B-Tree with write-ahead logging (WAL) and background snapshotting to NVMe SSD.
      • RPC Gateway: High-performance bidirectional gRPC streaming with Protobuf serialization.
      • Benchmarking: Sustained 48,000 writes/sec and 92,000 reads/sec with linear scale-out across 5 nodes under Jepsen partition tests.
    `,
    github: "https://github.com",
    demo: "#"
  },
  omnisync: {
    title: "OmniSync — Real-Time Collaborative Canvas & Code Workspace",
    tech: ["TypeScript", "React", "Node.js", "WebSockets", "CRDTs (Yjs)", "Redis Pub/Sub"],
    problem: "Real-time collaborative editing usually experiences high merge conflicts, latency lag, and data loss during intermittent client disconnections.",
    solution: "Engineered an end-to-end collaborative canvas and code workspace using Conflict-Free Replicated Data Types (CRDTs) over WebSockets, backed by Redis Pub/Sub for horizontal clustering across geographically distributed nodes.",
    architecture: `
      • Decentralized Sync: Conflict-free state resolution with fractional indexing and Yjs state vectors.
      • Ephemeral State: Live multi-cursor spatial tracking, presence heartbeats, and user selection highlighting.
      • Offline Resilience: Local IndexedDB caching ensures users can write code offline; seamless state hydration upon reconnect.
      • Performance: Sub-40ms round-trip synchronization latency with up to 100 concurrent collaborators per room.
    `,
    github: "https://github.com",
    demo: "#"
  },
  spectravm: {
    title: "SpectraVM — 32-Bit RISC-V Pipelined Processor Emulator",
    tech: ["C++20", "WebAssembly", "RISC-V (RV32I)", "React", "Tailwind CSS"],
    problem: "Understanding hardware hazard detection, pipeline forwarding, and cache hierarchy behavior requires intricate visualization rarely provided by static textbooks.",
    solution: "Developed a cycle-accurate software simulator in modern C++20 for the standard RV32I integer instruction set. Features a 5-stage execution pipeline (Fetch, Decode, Execute, Memory, Writeback), dynamic branch prediction, and multi-level cache simulation compiled to WebAssembly for browser inspection.",
    architecture: `
      • Pipeline Simulator: Accurate data hazard stall detection, register forwarding unit, and 2-bit branch history predictor.
      • Cache Hierarchy: Configurable direct-mapped, 2-way, and fully associative L1/L2 cache simulators with LRU replacement policy.
      • Wasm Bridge: High-throughput C++ bindings using Emscripten to allow cycle-by-cycle stepping in a sleek React visualizer.
      • Compiler Support: Direct assembly parsing from GNU RISC-V GCC toolchain ELF binaries.
    `,
    github: "https://github.com",
    demo: "#"
  },
  devpulse: {
    title: "DevPulse — Full-Stack Cloud Telemetry & Observability SaaS",
    tech: ["Python", "FastAPI", "Next.js", "TimescaleDB", "PostgreSQL", "Docker"],
    problem: "Engineering teams need lightweight, zero-overhead telemetry to monitor container metrics, memory leaks, and distributed HTTP error rates without enterprise bloat.",
    solution: "Architected a full-stack telemetry and monitoring solution featuring real-time stream ingestion, automated anomaly detection using statistical standard deviations, and an intuitive Next.js dark-mode dashboard with instant webhook alerts.",
    architecture: `
      • High-Throughput Ingestion: Asynchronous FastAPI worker pool handling 10,000+ metric payloads/minute.
      • Time-Series Aggregation: TimescaleDB hypertables with automated data tiering and retention policies.
      • Webhooks & Alerting: Real-time trigger system for Discord, Slack, and PagerDuty when p99 latency exceeds SLA.
      • Authentication: Stateless JWT authentication with role-based access control (RBAC).
    `,
    github: "https://github.com",
    demo: "#"
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-details');
  const closeBtn = document.getElementById('close-modal-btn');
  const triggerBtns = document.querySelectorAll('.open-project-modal');

  if (!modal || !modalContent) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="space-y-4">
        <div>
          <h3 class="text-xl md:text-2xl font-bold text-white">${data.title}</h3>
          <div class="flex flex-wrap gap-1.5 mt-2">
            ${data.tech.map(t => `<span class="px-2.5 py-0.5 text-xs rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-800/50 font-mono">${t}</span>`).join('')}
          </div>
        </div>

        <div class="space-y-3 text-sm text-slate-300">
          <div>
            <h4 class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">The Problem</h4>
            <p class="leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">${data.problem}</p>
          </div>

          <div>
            <h4 class="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">The Engineering Solution</h4>
            <p class="leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">${data.solution}</p>
          </div>

          <div>
            <h4 class="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-1">Architecture & Technical Details</h4>
            <div class="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs whitespace-pre-line text-slate-300 leading-normal">
              ${data.architecture.trim()}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Source Code
          </a>
          <button onclick="document.getElementById('project-modal').classList.add('hidden')" class="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition">
            Close Deep Dive
          </button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   7. Contact Form Handling & Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(input, message) {
    const parent = input.closest('.form-group') || input.parentElement;
    let errorSpan = parent.querySelector('.field-error');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'field-error text-rose-400 text-xs mt-1 block';
      parent.appendChild(errorSpan);
    }
    errorSpan.textContent = message;
    input.classList.add('border-rose-500', 'focus:ring-rose-500');
    input.classList.remove('border-slate-800', 'focus:ring-cyan-500');
  }

  function clearError(input) {
    const parent = input.closest('.form-group') || input.parentElement;
    const errorSpan = parent.querySelector('.field-error');
    if (errorSpan) errorSpan.remove();
    input.classList.remove('border-rose-500', 'focus:ring-rose-500');
    input.classList.add('border-slate-800');
  }

  [nameInput, emailInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => clearError(inp));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please provide your name (minimum 2 characters).');
      hasError = true;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      setError(emailInput, 'Please provide a valid email address.');
      hasError = true;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Message should be at least 10 characters long.');
      hasError = true;
    }

    if (hasError) return;

    // Simulate submission
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Sending transmission...
    `;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast('✓ Message transmitted successfully! Vidya will get back to you soon.', 'success');
    }, 1200);
  });
}

/* ==========================================================================
   8. Direct Email Copy to Clipboard
   ========================================================================== */
function initClipboardButtons() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'vidya.eng@example.com';
      copyToClipboardText(email);

      const label = btn.querySelector('.copy-label');
      if (label) {
        const originalText = label.textContent;
        label.textContent = 'Copied!';
        setTimeout(() => {
          label.textContent = originalText;
        }, 2000);
      }

      showToast(`Copied to clipboard: ${email}`, 'success');
    });
  });
}

function copyToClipboardText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    textArea.remove();
  }
}

/* ==========================================================================
   9. Animated Metric Counters
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-counter');
  let started = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const prefix = stat.getAttribute('data-prefix') || '';
      const duration = 1500;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = prefix + target + suffix;
          clearInterval(timer);
        } else {
          // If decimal target, keep 1 or 2 decimals
          if (target % 1 !== 0) {
            stat.textContent = prefix + current.toFixed(2) + suffix;
          } else {
            stat.textContent = prefix + Math.floor(current) + suffix;
          }
        }
      }, stepTime);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-row');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="flex-1">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3500);
}

// Utility HTML escape
function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
