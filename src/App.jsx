import { useState, useEffect, useRef } from 'react'

/* ============================================================================
   EDITABLE CONTENT — everything you'd normally change lives in these constants.
   ========================================================================= */

// Permanent profile photo served from public/profile.jpg.
const DEFAULT_IMAGE = '/profile.jpg'

const PROFILE = {
  name: 'Prasanna Sairam',
  fullName: 'Prasanna Govindarajulu Sairam',
  role: 'Backend, Systems & ML Engineer',
  thesis: 'I build the layers most people import.',
  bio: "Computer Science student at the University at Buffalo with a backend and systems focus. I've written an HTTP server, a bytecode interpreter, and a memory allocator from scratch — because the fastest way to understand a tool is to build it yourself. Right now I'm pointing that same instinct at quantitative research, building production ML pipelines over crypto market data at Tekly Studio.",
  emails: [
    { address: 'govinda2@buffalo.edu', label: 'University' },
    { address: 'prasannasairam05@gmail.com', label: 'Personal' },
  ],
  phone: '(585) 485-2224',
  location: 'Buffalo, NY',
  github: 'https://github.com/prasannaman44',
  githubHandle: 'prasannaman44',
  linkedin: 'https://www.linkedin.com/in/prasanna-sairam-a00241290',
  linkedinHandle: 'prasanna-sairam',
}

const STATUS = {
  available: true,
  headline: 'Interning at Tekly Studio — open to 2027 new-grad roles',
  focus: ['Backend', 'Systems', 'Machine Learning'],
}

const STATS = [
  { num: '~489', label: 'assets in a production ML pipeline' },
  { num: '5', label: 'projects shipped' },
  { num: '3', label: 'systems built from scratch' },
]

const HIGHLIGHTS = [
  {
    title: 'Production ML for crypto markets',
    blurb:
      'Built an end-to-end pipeline predicting 7-day directional returns across ~489 assets — then caught a survivorship-bias bug that was leaking delisted coins into live trading signals.',
    tags: ['Python', 'XGBoost', 'scikit-learn'],
  },
  {
    title: 'A web server with no framework',
    blurb:
      'Parsed raw HTTP, routed requests, managed bcrypt-hashed sessions, and ran real-time chat over WebSockets — all in plain Python, no Flask or Django.',
    tags: ['Python', 'WebSockets', 'bcrypt'],
  },
  {
    title: 'An interpreter for a stack language',
    blurb:
      'Built a stack-based bytecode interpreter with first-class functions, closures, recursion, and correct environment restoration across calls.',
    tags: ['OCaml'],
  },
  {
    title: 'My own malloc',
    blurb:
      'Implemented malloc, free, calloc, and realloc in C with multi-pool and bulk allocation strategies for efficient memory reuse.',
    tags: ['C'],
  },
  {
    title: 'A horror game that keeps you tense',
    blurb:
      'Designed enemy AI pathing, timed movement, jumpscare triggers, and fail-state logic — plus camera-feed UI — in Unreal Engine.',
    tags: ['Unreal Engine', 'C++'],
  },
]

const EXPERIENCE = [
  {
    role: 'Quantitative Research & AI Engineering Intern',
    company: 'Tekly Studio',
    location: 'Remote',
    date: 'Jun 2026 – Present',
    current: true,
    bullets: [
      'Built an end-to-end machine learning pipeline in Python (pandas, NumPy, scikit-learn, XGBoost) to predict 7-day directional returns across ~489 cryptocurrencies (~320K daily observations), spanning feature engineering, model tuning, backtesting, and production signal generation.',
      'Applied rigorous financial-ML validation — purged K-fold and walk-forward cross-validation, train-only imputation, and point-in-time correctness — to prevent data leakage and look-ahead bias; validation methodology passed a line-by-line technical review.',
      "Diagnosed and fixed a production survivorship-bias bug in which delisted assets' stale prices surfaced as current trading signals, implementing a point-in-time universe filter; the issue was highlighted cohort-wide as a genuine production find.",
      'Productionized the research model into a command-line script emitting standardized JSON trading signals, and managed the full Git branch / pull request / code-review workflow, iterating on detailed reviewer feedback.',
    ],
    tags: ['Python', 'pandas', 'scikit-learn', 'XGBoost'],
  },
]

const EDUCATION = {
  school: 'University at Buffalo',
  detail: 'School of Engineering and Applied Sciences',
  degree: 'B.S. in Computer Science',
  graduation: 'Expected May 2027',
  coursework: [
    'Object-Oriented Programming & Data Structures',
    'Algorithms & Complexity',
    'Systems Programming',
    'Computer Organization',
    'Web Applications',
    'Probability & Statistics',
  ],
}

const PROJECTS = [
  {
    id: '01',
    title: 'Backend Web Server',
    date: 'Sept – Dec 2025',
    tags: ['Python', 'MongoDB', 'WebSockets', 'bcrypt'],
    bullets: [
      'Built a custom HTTP server in Python from scratch — request parsing, routing, and response generation without any high-level web framework.',
      'Designed RESTful API endpoints supporting user authentication, real-time chat messaging, and file uploads.',
      'Implemented secure session management with hashed cookies and bcrypt password hashing to protect user credentials.',
      'Integrated MongoDB for users, chat history, and media, and added WebSocket handshakes to enable real-time messaging.',
    ],
    caseStudy: {
      challenge: 'Build a secure, real-time web backend without hiding the hard parts behind a framework.',
      approach: 'Implemented raw HTTP parsing and routing, REST endpoints, bcrypt-backed sessions, MongoDB persistence, file uploads, and the WebSocket handshake in Python.',
      result: 'Delivered authentication, media handling, and live chat while gaining a layer-by-layer understanding of how web requests become application behavior.',
    },
  },
  {
    id: '02',
    title: 'OCaml Interpreter',
    date: 'Oct – Dec 2024',
    tags: ['OCaml'],
    bullets: [
      'Built a stack-based interpreter for an OCaml-like bytecode language supporting arithmetic, boolean logic, strings, control flow, and error handling.',
      'Implemented first-class functions and closures, including recursion, higher-order functions, and lexical environment capture.',
      'Added support for function calls, returns, and in/out parameters, correctly restoring stack and environment state across calls.',
    ],
    caseStudy: {
      challenge: 'Support closures, recursion, and function calls without corrupting stack or environment state.',
      approach: 'Modeled lexical environments and call frames explicitly, then implemented capture, restoration, returns, and in/out parameter behavior.',
      result: 'Produced a working interpreter that preserves scope correctly across higher-order and recursive calls.',
    },
  },
  {
    id: '03',
    title: 'Memory Allocator',
    date: 'Nov – Dec 2024',
    tags: ['C'],
    bullets: [
      'Developed a custom memory allocator in C, implementing malloc, free, calloc, and realloc.',
      'Emphasized multi-pool and bulk allocation strategies for efficient memory reuse.',
    ],
    caseStudy: {
      challenge: 'Recreate the core allocation API while safely reusing memory across different request sizes.',
      approach: 'Implemented separate allocation pools and bulk-allocation paths, with matching free, calloc, and realloc behavior.',
      result: 'Built a functional allocator that exposes the tradeoffs behind memory reuse, fragmentation, and resizing.',
    },
  },
  {
    id: '04',
    title: 'Escape from UB',
    date: 'Nov – Dec 2025',
    featured: true,
    image: '/escape-from-ub.png',
    video: '/escape-from-ub-preview.mp4',
    imageAlt: 'Escape from UB gameplay showing the enemy encounter, battery meter, flash control, and map UI',
    summary:
      'A first-person survival-horror experience where every camera check, flash, and route choice costs time and battery.',
    tags: ['Unreal Engine', 'C++'],
    bullets: [
      "Designed and built a horror survival game inspired by Five Nights at Freddy's, featuring camera surveillance, enemy AI, and player resource management.",
      'Implemented core gameplay systems including AI pathing, timed enemy movement, jumpscare triggers, and fail-state logic to build player tension.',
      'Created interactive UI elements such as camera feeds, control panels, and status indicators.',
    ],
    caseStudy: {
      challenge: 'Create sustained tension using limited information, battery life, and enemy movement rather than constant action.',
      approach: 'Combined timed AI pathing, camera surveillance, flash and battery systems, a route map, jumpscare triggers, and fail-state logic in Unreal Engine.',
      result: 'Delivered a playable survival loop where each camera check and defensive choice carries a visible resource cost.',
    },
  },
  {
    id: '05',
    title: 'Song Rater',
    date: 'Feb – Mar 2024',
    tags: ['Java'],
    bullets: [
      'Built a Java application for rating songs, supporting adding, removing, and averaging ratings across multiple entries.',
      'Wrote comprehensive test cases covering standard and edge cases to validate functionality.',
    ],
    caseStudy: {
      challenge: 'Keep rating operations predictable as entries are added, removed, and averaged across edge cases.',
      approach: 'Designed a small Java domain model around rating operations and backed it with focused standard and edge-case tests.',
      result: 'Produced a reliable application with behavior validated by an explicit test suite.',
    },
  },
]

const SKILLS = [
  {
    group: 'Languages',
    context: 'What I write in. Python for the ML and backend work; C, C++, and OCaml for the systems side.',
    items: ['Python', 'Java', 'C', 'C++', 'OCaml', 'JavaScript', 'HTML/CSS'],
  },
  {
    group: 'ML & Data',
    context: 'The research stack behind the quant work — feature engineering, model tuning, and backtesting.',
    items: ['pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'Jupyter'],
  },
  {
    group: 'Tools & Technologies',
    context: 'The stack behind the projects — data, real-time transport, auth, and the editors I live in.',
    items: ['Git', 'MongoDB', 'WebSockets', 'bcrypt', 'Unreal Engine', 'IntelliJ IDEA'],
  },
  {
    group: 'Concepts',
    context: 'The ideas I keep coming back to: how requests are served, how memory is managed, how models earn trust.',
    items: [
      'Machine Learning',
      'Data Pipelines',
      'Model Validation & Backtesting',
      'REST APIs',
      'Backend Development',
      'Systems Programming',
      'Memory Management',
      'Object-Oriented Programming',
      'Data Structures & Algorithms',
    ],
  },
]

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Résumé' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

// The curated set of technologies used as project filters. Kept short and
// language-focused so the filter row stays uncluttered; sub-tags like MongoDB /
// WebSockets / bcrypt still appear on the project cards, just not as filters.
// A tech is "filterable" (clickable pill / clickable skill) iff it's in here.
const FILTERS = ['Python', 'C', 'C++', 'OCaml', 'Java', 'Unreal Engine']
const FILTER_SET = new Set(FILTERS)

/* ============================================================================
   INLINE ICONS
   ========================================================================= */

const Icon = {
  github: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.3v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.2 2.3 4.2 5.3v6.4zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zm1.8 13H3.6V9H7v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  ),
  download: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  expand: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" />
    </svg>
  ),
  copy: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
    </svg>
  ),
  doc: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6M9 9h1" />
    </svg>
  ),
  code: (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  pin: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z" />
    </svg>
  ),
}

/* ============================================================================
   CUSTOM CURSOR — the one memorable risk. Disabled on touch / reduced-motion.
   ========================================================================= */

function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const glow = useRef(null)
  const label = useRef(null)
  const raf = useRef(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.body.classList.add('has-custom-cursor')
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...target }
    let hovering = false
    let context = { label: '', tone: 'blue' }
    let overrideTimer = 0
    let pulseTimer = 0

    const isInteractive = (el) =>
      !!(el && el.closest && el.closest('a, button, [role="button"], input, label, .interactive'))

    const applyContext = (nextLabel = '', tone = 'blue') => {
      if (label.current) label.current.textContent = nextLabel
      document.body.classList.toggle('cursor-has-label', Boolean(nextLabel))
      document.body.dataset.cursorTone = tone
    }

    const onMove = (e) => {
      const next = isInteractive(e.target)
      if (next !== hovering) {
        hovering = next
        document.body.classList.toggle('cursor-hover', hovering)
      }

      const contextEl = e.target.closest?.('[data-cursor]')
      context = {
        label: contextEl?.dataset.cursor || '',
        tone: contextEl?.dataset.cursorTone || 'blue',
      }
      if (!overrideTimer) applyContext(context.label, context.tone)

      const magneticEl = e.target.closest?.('[data-cursor-magnetic]')
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        target.x = e.clientX + (rect.left + rect.width / 2 - e.clientX) * 0.22
        target.y = e.clientY + (rect.top + rect.height / 2 - e.clientY) * 0.22
      } else {
        target.x = e.clientX
        target.y = e.clientY
      }

      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (glow.current) glow.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (label.current) label.current.style.transform = `translate(${e.clientX + 20}px, ${e.clientY + 18}px)`
    }
    const onDown = () => {
      document.body.classList.add('cursor-down')
      document.body.classList.remove('cursor-pulse')
      requestAnimationFrame(() => document.body.classList.add('cursor-pulse'))
      clearTimeout(pulseTimer)
      pulseTimer = setTimeout(() => document.body.classList.remove('cursor-pulse'), 420)
    }
    const onUp = () => document.body.classList.remove('cursor-down')
    const onLeave = () => document.body.classList.add('cursor-hidden')
    const onEnter = () => document.body.classList.remove('cursor-hidden')
    const onMessage = (event) => {
      const detail = event.detail || {}
      clearTimeout(overrideTimer)
      applyContext(detail.label || '', detail.tone || 'green')
      overrideTimer = setTimeout(() => {
        overrideTimer = 0
        applyContext(context.label, context.tone)
      }, detail.duration || 900)
    }

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.18
      ringPos.y += (target.y - ringPos.y) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('cursor-message', onMessage)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('cursor-message', onMessage)
      clearTimeout(overrideTimer)
      clearTimeout(pulseTimer)
      document.body.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-down', 'cursor-hidden', 'cursor-has-label', 'cursor-pulse')
      delete document.body.dataset.cursorTone
    }
  }, [])

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={label} className="cursor-label mono" aria-hidden="true" />
    </>
  )
}

/* ============================================================================
   BACKGROUND MUSIC — starts immediately when the browser allows it. Browsers
   that block audible autoplay unlock it on the visitor's first interaction.
   ============================================================================ */

function BackgroundMusic() {
  const audio = useRef(null)

  useEffect(() => {
    const player = audio.current
    if (!player) return

    player.volume = 0.14
    const start = () => {
      if (document.hidden || !player.paused) return
      player.play().catch(() => {})
    }
    const handleVisibility = () => {
      if (document.hidden) {
        player.pause()
      } else {
        start()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    document.addEventListener('pointerdown', start, { once: true })
    document.addEventListener('touchstart', start, { once: true, passive: true })
    document.addEventListener('keydown', start, { once: true })
    start()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      document.removeEventListener('pointerdown', start)
      document.removeEventListener('touchstart', start)
      document.removeEventListener('keydown', start)
    }
  }, [])

  return (
    <audio ref={audio} autoPlay loop preload="auto" aria-hidden="true">
      <source src="/sweet-september-lofi.mp3" type="audio/mpeg" />
    </audio>
  )
}

/* ============================================================================
   REVEAL-ON-SCROLL HELPER
   ========================================================================= */

function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.reveal')
    // Fail open: if motion is reduced or IntersectionObserver is unavailable,
    // show everything immediately rather than leaving content invisible.
    if (reduce || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function ProjectCaseStudy({ project, expanded, onToggle }) {
  const panelId = `project-case-study-${project.id}`
  return (
    <div className="case-study-wrap">
      <button
        className={`case-study-toggle interactive${expanded ? ' open' : ''}`}
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
        data-cursor={expanded ? 'CLOSE' : 'DETAILS'}
        data-cursor-tone="amber"
        data-cursor-magnetic
      >
        <span>{expanded ? 'Close technical breakdown' : 'View technical breakdown'}</span>
        {Icon.arrow()}
      </button>
      {expanded && (
        <div className="case-study" id={panelId}>
          {[
            ['Challenge', project.caseStudy.challenge],
            ['Approach', project.caseStudy.approach],
            ['Result', project.caseStudy.result],
          ].map(([label, text]) => (
            <div className="case-study-step" key={label}>
              <span className="case-study-label mono">{label}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FeaturedPreview({ project }) {
  const video = useRef(null)

  const playPreview = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.current?.play().catch(() => {})
  }

  const resetPreview = () => {
    if (!video.current) return
    video.current.pause()
    video.current.currentTime = 0
  }

  return (
    <div
      className="featured-media interactive"
      tabIndex="0"
      aria-label={`${project.imageAlt}. Hover or focus to animate the preview.`}
      onMouseEnter={playPreview}
      onMouseLeave={resetPreview}
      onFocus={playPreview}
      onBlur={resetPreview}
      data-cursor="EXPLORE"
      data-cursor-tone="red"
      data-cursor-magnetic
    >
      <video ref={video} muted loop playsInline preload="metadata" poster={project.image} aria-hidden="true">
        <source src={project.video} type="video/mp4" />
      </video>
      <span className="featured-badge mono">Featured project</span>
      <span className="preview-hint mono">Hover to preview</span>
    </div>
  )
}

/* ============================================================================
   APP
   ========================================================================= */

export default function App() {
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [expandedProject, setExpandedProject] = useState(null)
  const [copied, setCopied] = useState(null)
  const avatarButton = useRef(null)
  const resumeWrap = useRef(null)
  const scrollRaf = useRef(0)

  useReveal()

  useEffect(() => {
    if (!photoOpen) return

    const previousOverflow = document.body.style.overflow
    const trigger = avatarButton.current
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setPhotoOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      trigger?.focus()
    }
  }, [photoOpen])

  // Scroll progress bar + "at page bottom highlights the last nav item"
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
      // The last section is too short to reach the scroll-spy band, so pin it
      // active once we're within a few px of the bottom.
      if (max > 0 && max - h.scrollTop < 4) setActive(NAV[NAV.length - 1].id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy for the sidebar
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Custom smooth scroll. Native smooth scrolling silently fails in some
  // browsers/embeds, so we animate the scroll ourselves. Driven by setTimeout
  // (not requestAnimationFrame) so it still runs in environments that throttle
  // frame callbacks; each step is an instant jump, the loop makes it smooth.
  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    clearTimeout(scrollRaf.current)

    // Offset for the sticky top bar that replaces the sidebar on narrow screens.
    const bar = document.querySelector('.sidebar')
    const isTopBar = bar && getComputedStyle(bar).position === 'sticky'
    const offset = isTopBar ? bar.offsetHeight + 12 : 0

    const startY = window.scrollY
    const maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    const targetY = Math.min(Math.max(el.getBoundingClientRect().top + startY - offset, 0), maxY)
    const dist = targetY - startY

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || Math.abs(dist) < 4) {
      window.scrollTo(0, targetY)
      return
    }

    const duration = Math.min(800, Math.max(320, Math.abs(dist) * 0.5))
    const startT = performance.now()
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const step = () => {
      const p = Math.min(1, (performance.now() - startT) / duration)
      window.scrollTo(0, Math.round(startY + dist * ease(p)))
      if (p < 1) scrollRaf.current = setTimeout(step, 16)
      else scrollRaf.current = 0
    }
    step()
  }

  // Single unified action for every tech chip (filter pills, card tags, skills):
  // set the filter and scroll the result into view.
  const filterTo = (tag) => {
    setFilter(tag)
    goTo('projects')
  }

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(email)
      window.dispatchEvent(new CustomEvent('cursor-message', {
        detail: { label: 'COPIED', tone: 'green', duration: 1000 },
      }))
      setTimeout(() => setCopied((current) => (current === email ? null : current)), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const fullscreenResume = () => {
    const el = resumeWrap.current
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(() => window.open('/resume.pdf', '_blank', 'noopener'))
    } else {
      window.open('/resume.pdf', '_blank', 'noopener')
    }
  }

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))
  const featuredProject = filteredProjects.find((p) => p.featured)
  const regularProjects = filteredProjects.filter((p) => !p.featured)
  const toggleProject = (id) => setExpandedProject((current) => (current === id ? null : id))

  const allTags = ['All', ...FILTERS]

  return (
    <>
      <style>{CSS}</style>
      <CustomCursor />
      <BackgroundMusic />

      {photoOpen && (
        <div className="photo-lightbox" onClick={() => setPhotoOpen(false)}>
          <div
            className="photo-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged portrait of Prasanna Sairam"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="photo-close interactive"
              onClick={() => setPhotoOpen(false)}
              aria-label="Close enlarged photo"
              data-cursor="CLOSE"
              data-cursor-tone="red"
              data-cursor-magnetic
              autoFocus
            >
              ×
            </button>
            <img src={DEFAULT_IMAGE} alt="Prasanna Sairam" />
            <p>Prasanna Sairam</p>
          </div>
        </div>
      )}

      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <a className="skip-link" href="#home">Skip to content</a>

      <div className="layout">
        {/* ---------------------------------------------------------------- */}
        {/* SIDEBAR */}
        {/* ---------------------------------------------------------------- */}
        <aside className="sidebar">
          <div className="sidebar-inner">
            <button
              ref={avatarButton}
              className="avatar interactive"
              onClick={() => setPhotoOpen(true)}
              title="View a larger photo"
              aria-label="View a larger photo of Prasanna Sairam"
              aria-haspopup="dialog"
              aria-expanded={photoOpen}
              data-cursor="VIEW"
              data-cursor-tone="blue"
              data-cursor-magnetic
            >
              <img src={DEFAULT_IMAGE} alt="Prasanna Sairam" />
              <span className="avatar-expand">{Icon.expand()}</span>
            </button>

            <div className="side-id">
              <h1 className="side-name">{PROFILE.name}</h1>
              <p className="side-role mono">{PROFILE.role}</p>
              {STATUS.available && (
                <span className="badge-available">
                  <span className="pulse" />
                  Available for work
                </span>
              )}
            </div>

            <nav className="side-nav" aria-label="Sections">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  className={`nav-link${active === item.id ? ' active' : ''}`}
                  onClick={() => goTo(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  <span className="nav-tick" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="side-social">
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="interactive" data-cursor="GITHUB" data-cursor-tone="blue" data-cursor-magnetic>
                {Icon.github()}
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="interactive" data-cursor="LINKEDIN" data-cursor-tone="blue" data-cursor-magnetic>
                {Icon.linkedin()}
              </a>
              <a href={`mailto:${PROFILE.emails[0].address}`} aria-label="Email" className="interactive" data-cursor="EMAIL" data-cursor-tone="blue" data-cursor-magnetic>
                {Icon.mail()}
              </a>
            </div>
          </div>
        </aside>

        {/* ---------------------------------------------------------------- */}
        {/* MAIN */}
        {/* ---------------------------------------------------------------- */}
        <main className="main">
          {/* HOME ------------------------------------------------------- */}
          <section id="home" className="section section-home">
            <div className={`status-banner reveal${STATUS.available ? ' on' : ''}`}>
              <span className="status-dot" />
              <span className="status-text">
                <strong>{STATUS.headline}</strong>
                <span className="status-focus mono">{STATUS.focus.join(' · ')}</span>
              </span>
            </div>

            <p className="eyebrow mono reveal">{PROFILE.fullName}</p>
            <h2 className="thesis reveal">{PROFILE.thesis}</h2>
            <p className="bio reveal">{PROFILE.bio}</p>

            <div className="stats reveal">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat-num mono">{s.num}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="choices reveal">
              <a
                className="choice choice-resume interactive"
                href="/resume.pdf"
                download
                data-cursor="PDF"
                data-cursor-tone="amber"
                data-cursor-magnetic
              >
                <span className="choice-icon">{Icon.doc()}</span>
                <span className="choice-body">
                  <span className="choice-kicker mono">Recruiter shortcut</span>
                  <span className="choice-title">Download my résumé</span>
                  <span className="choice-sub">One-page PDF with the full technical picture.</span>
                </span>
                <span className="choice-arrow">{Icon.download()}</span>
              </a>
              <button
                className="choice choice-projects interactive"
                onClick={() => goTo('projects')}
                data-cursor="PROJECTS"
                data-cursor-tone="blue"
                data-cursor-magnetic
              >
                <span className="choice-icon">{Icon.code()}</span>
                <span className="choice-body">
                  <span className="choice-title">My projects</span>
                  <span className="choice-sub">What I've built, in detail.</span>
                </span>
                <span className="choice-arrow">{Icon.arrow()}</span>
              </button>
            </div>
          </section>

          {/* HIGHLIGHTS ------------------------------------------------- */}
          <section id="highlights" className="section">
            <header className="section-head reveal">
              <span className="section-id mono">/ highlights</span>
              <h2>The work I'm proudest of</h2>
              <p className="section-lead">The work that shows how I think — from production ML down to my own malloc.</p>
            </header>
            <div className="highlight-grid">
              {HIGHLIGHTS.map((h) => (
                <article className="highlight-card reveal" key={h.title}>
                  <h3>{h.title}</h3>
                  <p>{h.blurb}</p>
                  <div className="tag-row">
                    {h.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* EXPERIENCE ------------------------------------------------- */}
          <section id="experience" className="section">
            <header className="section-head reveal">
              <span className="section-id mono">/ experience</span>
              <h2>Where I'm working</h2>
              <p className="section-lead">Research and engineering on live market data.</p>
            </header>

            <div className="exp-list">
              {EXPERIENCE.map((job) => (
                <article className="exp-card reveal" key={`${job.company}-${job.role}`}>
                  <div className="exp-top">
                    <div className="exp-id">
                      <h3>{job.role}</h3>
                      <p className="exp-company">
                        {job.company}
                        <span className="exp-sep">·</span>
                        <span className="exp-location">{job.location}</span>
                      </p>
                    </div>
                    <span className={`exp-date mono${job.current ? ' current' : ''}`}>
                      {job.current && <span className="pulse" />}
                      {job.date}
                    </span>
                  </div>

                  <ul className="project-bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  <div className="tag-row">
                    {job.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* RESUME ----------------------------------------------------- */}
          <section id="resume" className="section">
            <header className="section-head reveal">
              <span className="section-id mono">/ résumé</span>
              <h2>One page, the whole picture</h2>
              <p className="section-lead">Read it inline, download a copy, or open it full-screen.</p>
            </header>

            <div className="resume-actions reveal">
              <a className="btn btn-amber interactive" href="/resume.pdf" download data-cursor="PDF" data-cursor-tone="amber" data-cursor-magnetic>
                {Icon.download()} Download PDF
              </a>
              <button className="btn btn-ghost interactive" onClick={fullscreenResume} data-cursor="VIEW" data-cursor-tone="blue" data-cursor-magnetic>
                {Icon.expand()} Full-screen
              </button>
            </div>

            <div className="resume-frame reveal" ref={resumeWrap}>
              <iframe
                src="/resume.pdf#view=FitH"
                title="Prasanna Sairam — résumé (PDF)"
                loading="lazy"
              />
            </div>
            <p className="resume-note">
              Trouble viewing it here?{' '}
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Open the PDF in a new tab
              </a>
              .
            </p>

            <article className="edu-card reveal">
              <div className="edu-top">
                <div>
                  <h3>{EDUCATION.school}</h3>
                  <p className="edu-detail">{EDUCATION.detail}</p>
                  <p className="edu-degree">{EDUCATION.degree}</p>
                </div>
                <span className="edu-grad mono">{EDUCATION.graduation}</span>
              </div>
              <p className="edu-label mono">Relevant coursework</p>
              <div className="chip-row">
                {EDUCATION.coursework.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </article>
          </section>

          {/* PROJECTS --------------------------------------------------- */}
          <section id="projects" className="section">
            <header className="section-head reveal">
              <span className="section-id mono">/ projects</span>
              <h2>Everything I've built</h2>
              <p className="section-lead">A closer look at how I turn low-level ideas into working systems and experiences.</p>
            </header>

            <div className="filters reveal" role="group" aria-label="Filter projects by technology">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter${filter === tag ? ' active' : ''}`}
                  onClick={() => filterTo(tag)}
                  aria-pressed={filter === tag}
                >
                  {tag}
                </button>
              ))}
            </div>

            {featuredProject && (
              <article className="featured-project reveal">
                <FeaturedPreview project={featuredProject} />
                <div className="featured-content">
                  <div className="featured-meta mono">
                    <span>{featuredProject.date}</span>
                    <span>Project {featuredProject.id}</span>
                  </div>
                  <h3>{featuredProject.title}</h3>
                  <p className="featured-summary">{featuredProject.summary}</p>
                  <ul className="project-bullets">
                    {featuredProject.bullets.slice(0, 2).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {featuredProject.tags.map((t) => (
                      <span key={t} className={`tag${filter === t ? ' tag-active' : ''}`}>{t}</span>
                    ))}
                  </div>
                  <ProjectCaseStudy
                    project={featuredProject}
                    expanded={expandedProject === featuredProject.id}
                    onToggle={() => toggleProject(featuredProject.id)}
                  />
                  <a
                    className="project-cta interactive"
                    href={`mailto:${PROFILE.emails[0].address}?subject=${encodeURIComponent('Escape from UB project')}`}
                    data-cursor="EMAIL"
                    data-cursor-tone="blue"
                    data-cursor-magnetic
                  >
                    {Icon.mail()} Ask me about this build
                  </a>
                </div>
              </article>
            )}

            <div className="project-list" key={filter}>
              {regularProjects.map((p) => (
                <article className="project" key={p.id}>
                  <div className="project-side">
                    <span className="project-id mono">{p.id}</span>
                    <span className="project-date mono">{p.date}</span>
                  </div>
                  <div className="project-main">
                    <h3>{p.title}</h3>
                    <ul className="project-bullets">
                      {p.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <div className="tag-row">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className={`tag${filter === t ? ' tag-active' : ''}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ProjectCaseStudy
                      project={p}
                      expanded={expandedProject === p.id}
                      onToggle={() => toggleProject(p.id)}
                    />
                    <a
                      className="project-link interactive"
                      href={`mailto:${PROFILE.emails[0].address}?subject=${encodeURIComponent(`${p.title} project`)}`}
                      data-cursor="EMAIL"
                      data-cursor-tone="blue"
                    >
                      Ask about this project {Icon.arrow()}
                    </a>
                  </div>
                </article>
              ))}
              {filteredProjects.length === 0 && (
                <p className="empty">No projects tagged “{filter}”.</p>
              )}
            </div>
          </section>

          {/* SKILLS ----------------------------------------------------- */}
          <section id="skills" className="section">
            <header className="section-head reveal">
              <span className="section-id mono">/ skills</span>
              <h2>The toolkit</h2>
              <p className="section-lead">
                Skills tied to a project are <span className="hint">clickable</span> — they jump to the work that used them.
              </p>
            </header>

            <div className="skills-grid">
              {SKILLS.map((group) => (
                <article className="skill-card reveal" key={group.group}>
                  <h3 className="mono">{group.group}</h3>
                  <p className="skill-context">{group.context}</p>
                  <div className="skill-items">
                    {group.items.map((item) => {
                      const linkable = FILTER_SET.has(item)
                      return linkable ? (
                        <button
                          key={item}
                          className="skill skill-link interactive"
                          onClick={() => filterTo(item)}
                          title={`See projects using ${item}`}
                        >
                          {item}
                          <span className="skill-arrow">{Icon.arrow()}</span>
                        </button>
                      ) : (
                        <span key={item} className="skill">{item}</span>
                      )
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CONTACT ---------------------------------------------------- */}
          <section id="contact" className="section section-contact">
            <header className="section-head reveal">
              <span className="section-id mono">/ contact</span>
              <h2>Let's talk</h2>
              <p className="section-lead">The fastest way to reach me is email. I read everything.</p>
            </header>

            <div className="contact-card reveal">
              <div className="email-list">
                {PROFILE.emails.map(({ address, label }) => (
                  <button
                    key={address}
                    className="email-copy interactive"
                    onClick={() => copyEmail(address)}
                    aria-label={`Copy ${label.toLowerCase()} email address`}
                    data-cursor="COPY"
                    data-cursor-tone="blue"
                    data-cursor-magnetic
                  >
                    <span className="email-details">
                      <span className="email-label">{label}</span>
                      <span className="email-text mono">{address}</span>
                    </span>
                    <span className={`copy-state${copied === address ? ' done' : ''}`}>
                      {copied === address ? (<>{Icon.check()} Copied</>) : (<>{Icon.copy()} Copy</>)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="contact-meta">
                <span className="meta-item">{Icon.phone()} {PROFILE.phone}</span>
                <span className="meta-item">{Icon.pin()} {PROFILE.location}</span>
              </div>

              <div className="contact-buttons">
                {PROFILE.emails.map(({ address, label }, index) => (
                  <a
                    key={address}
                    className={`btn ${index === 0 ? 'btn-accent' : 'btn-ghost'} interactive`}
                    href={`mailto:${address}`}
                    data-cursor="EMAIL"
                    data-cursor-tone="blue"
                    data-cursor-magnetic
                  >
                    {Icon.mail()} {label} email
                  </a>
                ))}
                <a className="btn btn-ghost interactive" href={PROFILE.github} target="_blank" rel="noopener noreferrer" data-cursor="GITHUB" data-cursor-tone="blue" data-cursor-magnetic>
                  {Icon.github()} GitHub
                </a>
                <a className="btn btn-ghost interactive" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN" data-cursor-tone="blue" data-cursor-magnetic>
                  {Icon.linkedin()} LinkedIn
                </a>
              </div>
            </div>

            <footer className="footer mono">
              © {new Date().getFullYear()} {PROFILE.fullName}
            </footer>
          </section>
        </main>
      </div>
    </>
  )
}

/* ============================================================================
   STYLES — self-contained, injected via <style>. No Tailwind needed.
   ========================================================================= */

const CSS = `
:root {
  --bg: #081229;
  --bg-2: #0a1733;
  --panel: #0e1d3d;
  --panel-2: #122549;
  --panel-line: rgba(120, 150, 220, 0.16);
  --text: #EAF0FF;
  --muted: #93a4c8;
  --muted-2: #6f82ab;
  --accent: #5B8CFF;
  --accent-soft: rgba(91, 140, 255, 0.14);
  --amber: #F0B64B;
  --amber-soft: rgba(240, 182, 75, 0.14);
  --green: #3ddc84;
  --radius: 16px;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  --mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;
  --sidebar-w: 300px;
}

* { box-sizing: border-box; }

/* Smooth scrolling is handled in JS (goTo) for reliability; keep CSS instant
   so it doesn't fight the rAF animation. */
html { scroll-behavior: auto; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image:
    radial-gradient(900px 500px at 78% -8%, rgba(91, 140, 255, 0.10), transparent 60%),
    radial-gradient(700px 500px at 0% 100%, rgba(240, 182, 75, 0.05), transparent 55%);
  background-attachment: fixed;
}

.mono { font-family: var(--mono); }

h1, h2, h3 { margin: 0; font-weight: 650; letter-spacing: -0.02em; line-height: 1.2; }

a { color: inherit; text-decoration: none; }

::selection { background: rgba(91, 140, 255, 0.35); color: #fff; }

/* Focus visibility ------------------------------------------------------- */
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 6px;
}

.skip-link {
  position: fixed;
  top: -60px;
  left: 12px;
  z-index: 1000;
  background: var(--accent);
  color: #04122e;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: top 0.2s;
}
.skip-link:focus { top: 12px; }

/* Progress bar ----------------------------------------------------------- */
.progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--amber));
  z-index: 900;
  transition: width 0.08s linear;
}

/* Custom cursor ---------------------------------------------------------- */
.has-custom-cursor {
  --cursor-color: var(--accent);
  --cursor-soft: rgba(91, 140, 255, 0.12);
}
.has-custom-cursor[data-cursor-tone="amber"] { --cursor-color: var(--amber); --cursor-soft: rgba(240, 182, 75, 0.12); }
.has-custom-cursor[data-cursor-tone="red"] { --cursor-color: #ff4d5f; --cursor-soft: rgba(255, 77, 95, 0.14); }
.has-custom-cursor[data-cursor-tone="green"] { --cursor-color: var(--green); --cursor-soft: rgba(61, 220, 132, 0.14); }
.cursor-dot, .cursor-ring, .cursor-glow, .cursor-label { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 950; }
.has-custom-cursor, .has-custom-cursor a, .has-custom-cursor button, .has-custom-cursor .interactive { cursor: none; }
.cursor-dot {
  width: 14px; height: 14px; margin: -7px 0 0 -7px;
  color: var(--cursor-color); transition: opacity 0.2s, color 0.18s;
}
.cursor-dot::before, .cursor-dot::after { content: ''; position: absolute; background: currentColor; border-radius: 2px; }
.cursor-dot::before { width: 14px; height: 2px; top: 6px; left: 0; }
.cursor-dot::after { width: 2px; height: 14px; top: 0; left: 6px; }
.cursor-ring {
  width: 38px; height: 38px; margin: -19px 0 0 -19px;
  border: 1.5px solid var(--cursor-color); border-radius: 50%;
  background: var(--cursor-soft);
  box-shadow: 0 0 24px var(--cursor-soft);
  transition: width 0.2s, height 0.2s, margin 0.2s, border-radius 0.2s, border-color 0.18s, background 0.18s, opacity 0.2s;
}
.cursor-ring::after { content: ''; position: absolute; inset: -1px; border: 1px solid var(--cursor-color); border-radius: inherit; opacity: 0; }
.cursor-glow {
  width: 360px; height: 360px; margin: -180px 0 0 -180px; border-radius: 50%;
  background: radial-gradient(circle, var(--cursor-soft), transparent 65%);
  transition: width 0.3s, height 0.3s, margin 0.3s;
}
.cursor-label {
  padding: 5px 8px; border-radius: 6px;
  color: #061127; background: var(--cursor-color);
  font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em;
  opacity: 0; transition: opacity 0.14s, color 0.18s, background 0.18s;
}
.cursor-hover .cursor-ring {
  width: 54px; height: 54px; margin: -27px 0 0 -27px;
}
.cursor-hover .cursor-glow { width: 460px; height: 460px; margin: -230px 0 0 -230px; }
.cursor-has-label .cursor-ring { width: 68px; height: 40px; margin: -20px 0 0 -34px; border-radius: 999px; }
.cursor-has-label .cursor-label { opacity: 1; }
.cursor-down .cursor-ring { width: 26px; height: 26px; margin: -13px 0 0 -13px; }
.cursor-pulse .cursor-ring::after { animation: cursor-radar 0.4s ease-out both; }
.cursor-hidden .cursor-dot, .cursor-hidden .cursor-ring, .cursor-hidden .cursor-glow, .cursor-hidden .cursor-label { opacity: 0; }
@keyframes cursor-radar { from { opacity: 0.8; transform: scale(0.7); } to { opacity: 0; transform: scale(1.9); } }

/* Portrait lightbox ------------------------------------------------------ */
.photo-lightbox {
  position: fixed; inset: 0; z-index: 925;
  display: grid; place-items: center; padding: 24px;
  background: rgba(2, 7, 18, 0.9);
  backdrop-filter: blur(14px);
  animation: lightbox-in 0.22s ease both;
}
.photo-dialog {
  position: relative; width: min(440px, 88vw);
  animation: portrait-in 0.28s ease both;
}
.photo-dialog img {
  display: block; width: 100%; aspect-ratio: 1; object-fit: cover;
  border-radius: 32px; border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 35px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(91,140,255,0.12);
}
.photo-dialog p { margin-top: 14px; color: var(--muted); font-family: var(--mono); font-size: 13px; text-align: center; }
.photo-close {
  position: absolute; z-index: 1; top: 14px; right: 14px;
  width: 42px; height: 42px; border-radius: 50%;
  display: grid; place-items: center;
  color: var(--text); background: rgba(8,18,41,0.82);
  border: 1px solid rgba(255,255,255,0.18);
  font-family: var(--sans); font-size: 29px; font-weight: 300; line-height: 1;
  transition: transform 0.2s, background 0.2s, border-color 0.2s;
}
.photo-close:hover { transform: rotate(6deg) scale(1.05); background: var(--accent); border-color: var(--accent); color: #04122e; }
@keyframes lightbox-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes portrait-in { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .photo-lightbox, .photo-dialog { animation: none; } }

/* Layout ----------------------------------------------------------------- */
.layout { display: block; }

.sidebar {
  position: fixed;
  top: 0; left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  height: 100svh;
  padding: 34px 26px;
  background: linear-gradient(180deg, var(--bg-2), var(--bg));
  border-right: 1px solid var(--panel-line);
  z-index: 100;
  overflow-y: auto;
}
.sidebar-inner { display: flex; flex-direction: column; gap: 26px; min-height: 100%; }

.avatar {
  position: relative;
  width: 144px; height: 144px;
  border-radius: 30px;
  border: 1px solid var(--panel-line);
  background: var(--panel);
  padding: 0; overflow: hidden;
  display: grid; place-items: center;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.avatar:hover { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 10px 30px rgba(91, 140, 255, 0.25); }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar-expand {
  position: absolute; right: 5px; bottom: 5px;
  width: 30px; height: 30px; border-radius: 9px;
  background: rgba(8, 18, 41, 0.82); color: var(--text);
  display: grid; place-items: center;
  opacity: 0; transition: opacity 0.2s;
}
.avatar-expand svg { width: 15px; height: 15px; }
.avatar:hover .avatar-expand, .avatar:focus-visible .avatar-expand { opacity: 1; }

.side-name { font-size: 25px; }
.side-role { color: var(--accent); font-size: 13px; margin-top: 5px; letter-spacing: 0; }

.badge-available {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 14px;
  padding: 6px 12px;
  font-size: 12.5px; font-weight: 600;
  color: var(--green);
  background: rgba(61, 220, 132, 0.10);
  border: 1px solid rgba(61, 220, 132, 0.3);
  border-radius: 999px;
}
.pulse {
  width: 8px; height: 8px; border-radius: 50%; background: var(--green);
  box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.6);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.55); }
  70% { box-shadow: 0 0 0 8px rgba(61, 220, 132, 0); }
  100% { box-shadow: 0 0 0 0 rgba(61, 220, 132, 0); }
}
@media (prefers-reduced-motion: reduce) { .pulse { animation: none; } }

.side-nav { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; }
.nav-link {
  display: flex; align-items: center; gap: 12px;
  background: none; border: 0;
  color: var(--muted); font-family: var(--sans);
  font-size: 15px; text-align: left;
  padding: 9px 10px; border-radius: 9px;
  transition: color 0.2s, background 0.2s;
}
.nav-link:hover { color: var(--text); background: rgba(255,255,255,0.03); }
.nav-tick {
  width: 16px; height: 2px; border-radius: 2px;
  background: var(--muted-2);
  transition: width 0.25s, background 0.25s;
}
.nav-link.active { color: var(--text); }
.nav-link.active .nav-tick { width: 28px; background: var(--accent); }

.side-social { display: flex; gap: 10px; margin-top: auto; padding-top: 12px; }
.side-social a {
  width: 40px; height: 40px; border-radius: 11px;
  display: grid; place-items: center;
  color: var(--muted);
  border: 1px solid var(--panel-line); background: var(--panel);
  transition: color 0.2s, transform 0.2s, border-color 0.2s;
}
.side-social a:hover { color: var(--text); transform: translateY(-2px); border-color: var(--accent); }

/* Main ------------------------------------------------------------------- */
.main {
  margin-left: var(--sidebar-w);
  padding: 0 clamp(24px, 5vw, 72px);
  max-width: 1180px;
}

.section { padding: 92px 0; border-bottom: 1px solid var(--panel-line); }
.section:last-child { border-bottom: 0; }
.section-home { padding-top: clamp(56px, 12vh, 120px); }

.section-head { margin-bottom: 38px; max-width: 680px; }
.section-id { color: var(--accent); font-size: 13px; letter-spacing: 0.04em; }
.section-head h2 { font-size: clamp(26px, 4vw, 38px); margin: 12px 0 10px; }
.section-lead { color: var(--muted); font-size: 16px; }
.hint { color: var(--amber); font-weight: 600; }

/* Home ------------------------------------------------------------------- */
.status-banner {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 10px 16px; border-radius: 999px;
  background: var(--panel); border: 1px solid var(--panel-line);
  margin-bottom: 30px;
}
.status-dot {
  width: 9px; height: 9px; border-radius: 50%; background: var(--muted-2); flex: none;
}
.status-banner.on .status-dot {
  background: var(--green);
  box-shadow: 0 0 0 0 rgba(61, 220, 132, 0.6);
  animation: pulse 2s infinite;
}
.status-text { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; font-size: 14.5px; }
.status-text strong { font-weight: 600; }
.status-focus { color: var(--muted); font-size: 12.5px; }

.eyebrow { color: var(--muted); font-size: 14px; letter-spacing: 0.02em; }
.thesis {
  font-size: clamp(34px, 6vw, 60px);
  line-height: 1.08;
  margin: 14px 0 22px;
  max-width: 14ch;
  background: linear-gradient(120deg, var(--text) 40%, var(--accent));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.bio { color: var(--muted); font-size: 18px; max-width: 60ch; }

.stats { display: flex; gap: 40px; margin: 40px 0 44px; flex-wrap: wrap; }
.stat { display: flex; flex-direction: column; gap: 4px; }
.stat-num { font-size: 38px; font-weight: 600; color: var(--text); line-height: 1; }
.stat-label { color: var(--muted); font-size: 13.5px; max-width: 16ch; }

.choices { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; max-width: 760px; }
.choice {
  display: flex; align-items: center; gap: 16px; text-align: left;
  padding: 22px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
  color: var(--text); font-family: var(--sans); text-decoration: none;
  transition: transform 0.25s, border-color 0.25s, background 0.25s;
}
.choice:hover { transform: translateY(-3px); }
.choice-icon { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; flex: none; }
.choice-resume {
  border-color: rgba(240,182,75,0.48);
  background: linear-gradient(135deg, rgba(240,182,75,0.16), var(--panel) 62%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
}
.choice-resume .choice-icon { background: var(--amber); color: #2a1c00; }
.choice-resume:hover { border-color: var(--amber); background: linear-gradient(135deg, rgba(240,182,75,0.24), var(--panel) 70%); }
.choice-projects .choice-icon { background: var(--accent-soft); color: var(--accent); }
.choice-projects:hover { border-color: var(--accent); background: linear-gradient(180deg, var(--panel), rgba(91,140,255,0.05)); }
.choice-body { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.choice-kicker { color: var(--amber); font-size: 10.5px; letter-spacing: 0.09em; text-transform: uppercase; margin-bottom: 2px; }
.choice-title { font-size: 18px; font-weight: 600; }
.choice-sub { color: var(--muted); font-size: 13.5px; }
.choice-arrow { color: var(--muted); transition: transform 0.25s, color 0.25s; flex: none; }
.choice:hover .choice-arrow { transform: translateX(4px); color: var(--text); }

/* Experience ------------------------------------------------------------- */
.exp-list { display: flex; flex-direction: column; gap: 16px; }
.exp-card {
  padding: 28px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
  border-left: 3px solid var(--accent);
  transition: transform 0.25s, border-color 0.25s;
}
.exp-card:hover { transform: translateY(-2px); }
.exp-top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 16px; flex-wrap: wrap; margin-bottom: 18px;
}
.exp-card h3 { font-size: 21px; }
.exp-company { color: var(--accent); font-size: 15px; margin-top: 5px; font-weight: 600; }
.exp-sep { color: var(--muted-2); margin: 0 8px; font-weight: 400; }
.exp-location { color: var(--muted); font-weight: 400; }
.exp-date {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--muted); font-size: 12.5px; white-space: nowrap;
  padding: 6px 12px; border-radius: 999px;
  background: var(--bg-2); border: 1px solid var(--panel-line);
}
.exp-date.current { color: var(--green); border-color: rgba(61, 220, 132, 0.3); background: rgba(61, 220, 132, 0.08); }

/* Highlights ------------------------------------------------------------- */
.highlight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.highlight-card {
  padding: 26px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
  transition: transform 0.25s, border-color 0.25s;
}
.highlight-card:hover { transform: translateY(-3px); border-color: var(--accent); }
.highlight-card h3 { font-size: 19px; margin-bottom: 10px; }
.highlight-card p { color: var(--muted); font-size: 15px; margin-bottom: 16px; }

.tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  font-family: var(--mono); font-size: 12px;
  padding: 4px 10px; border-radius: 999px;
  color: var(--accent); background: var(--accent-soft);
  border: 1px solid rgba(91,140,255,0.22);
}
button.tag { cursor: pointer; transition: background 0.2s, color 0.2s; }
button.tag:hover, .tag-active { background: var(--accent); color: #04122e; }

/* Résumé ----------------------------------------------------------------- */
.resume-actions { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
.resume-frame {
  border-radius: var(--radius); overflow: hidden;
  border: 1px solid var(--panel-line); background: #525659;
  height: min(85vh, 920px);
}
.resume-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
.resume-note { color: var(--muted); font-size: 14px; margin-top: 12px; }
.resume-note a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.resume-note a:hover { color: var(--text); }

.btn {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 11px 18px; border-radius: 11px;
  font-size: 14.5px; font-weight: 600; font-family: var(--sans);
  border: 1px solid transparent; cursor: pointer;
  transition: transform 0.2s, background 0.2s, border-color 0.2s, color 0.2s;
}
.btn:hover { transform: translateY(-2px); }
.btn-amber { background: var(--amber); color: #2a1c00; }
.btn-accent { background: var(--accent); color: #04122e; }
.btn-ghost { background: var(--panel); color: var(--text); border-color: var(--panel-line); }
.btn-ghost:hover { border-color: var(--accent); }

.edu-card {
  margin-top: 26px; padding: 26px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
}
.edu-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 18px; }
.edu-card h3 { font-size: 20px; }
.edu-detail { color: var(--muted); font-size: 14px; margin-top: 4px; }
.edu-degree { color: var(--text); font-size: 15px; margin-top: 6px; }
.edu-grad {
  color: var(--amber); font-size: 13px; white-space: nowrap;
  padding: 6px 12px; border-radius: 999px; background: var(--amber-soft); border: 1px solid rgba(240,182,75,0.25);
}
.edu-label { color: var(--muted-2); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 12px; }
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-size: 13px; padding: 6px 12px; border-radius: 9px;
  color: var(--muted); background: var(--bg-2);
  border: 1px solid var(--panel-line);
}

/* Projects --------------------------------------------------------------- */
.filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px; }
.filter {
  font-family: var(--mono); font-size: 13px;
  padding: 7px 14px; border-radius: 999px; cursor: pointer;
  color: var(--muted); background: var(--panel);
  border: 1px solid var(--panel-line);
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
.filter:hover { color: var(--text); border-color: var(--accent); }
.filter.active { color: #04122e; background: var(--accent); border-color: var(--accent); }

.featured-project {
  display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.85fr);
  overflow: hidden; margin-bottom: 18px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid rgba(240,182,75,0.34);
  box-shadow: 0 22px 55px rgba(0,0,0,0.18);
}
.featured-media { position: relative; min-height: 370px; overflow: hidden; background: #020203; }
.featured-media::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, transparent 65%, rgba(8,18,41,0.42)), linear-gradient(0deg, rgba(0,0,0,0.28), transparent 45%);
}
.featured-media video { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; filter: brightness(1.22) contrast(1.05); }
.featured-media:focus-visible { outline: 2px solid #ff4d5f; outline-offset: -3px; }
.featured-badge {
  position: absolute; z-index: 1; top: 18px; left: 18px;
  padding: 7px 11px; border-radius: 999px;
  color: #2a1c00; background: var(--amber); font-size: 10.5px; letter-spacing: 0.07em; text-transform: uppercase;
}
.preview-hint {
  position: absolute; z-index: 1; left: 18px; bottom: 18px;
  padding: 6px 9px; border-radius: 7px;
  color: var(--text); background: rgba(4,10,24,0.74);
  border: 1px solid rgba(255,255,255,0.12);
  font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase;
  transition: opacity 0.2s, transform 0.2s;
}
.featured-media:hover .preview-hint, .featured-media:focus .preview-hint { opacity: 0; transform: translateY(4px); }
.featured-content { padding: 30px; display: flex; flex-direction: column; justify-content: center; }
.featured-meta { display: flex; justify-content: space-between; gap: 14px; color: var(--muted-2); font-size: 11.5px; }
.featured-content h3 { font-size: 28px; margin: 12px 0 10px; }
.featured-summary { color: var(--text); font-size: 16px; line-height: 1.65; margin-bottom: 18px; }
.project-cta, .project-link {
  display: inline-flex; align-items: center; gap: 8px; width: fit-content;
  color: var(--text); text-decoration: none; font-size: 13.5px; font-weight: 600;
}
.project-cta {
  margin-top: 22px; padding: 10px 14px; border-radius: 10px;
  color: #04122e; background: var(--accent);
  transition: transform 0.2s, box-shadow 0.2s;
}
.project-cta:hover { transform: translateY(-2px); box-shadow: 0 9px 25px rgba(91,140,255,0.23); }

.case-study-wrap { margin-top: 20px; }
.case-study-toggle {
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
  width: 100%; padding: 11px 13px; border-radius: 10px;
  color: var(--text); background: var(--bg-2); border: 1px solid var(--panel-line);
  font-family: var(--sans); font-size: 13.5px; font-weight: 600; text-align: left;
  transition: border-color 0.2s, background 0.2s;
}
.case-study-toggle:hover, .case-study-toggle.open { border-color: var(--amber); background: var(--amber-soft); }
.case-study-toggle svg { width: 16px; height: 16px; flex: none; transition: transform 0.22s; }
.case-study-toggle.open svg { transform: rotate(90deg); }
.case-study {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px;
  margin-top: 10px; animation: case-study-in 0.24s ease both;
}
.featured-project .case-study { grid-template-columns: 1fr; }
.case-study-step {
  padding: 14px; border-radius: 10px;
  background: rgba(5,13,31,0.64); border: 1px solid var(--panel-line);
}
.case-study-label { display: block; color: var(--amber); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 7px; }
.case-study-step p { color: var(--muted); font-size: 13.5px; line-height: 1.6; }
@keyframes case-study-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .case-study { animation: none; } }

.project-list { display: flex; flex-direction: column; gap: 16px; }
/* Re-keyed on every filter change, so the results always animate in fully
   visible — no dependency on the scroll-reveal observer. */
.project-list { animation: results-in 0.38s ease both; }
@keyframes results-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .project-list { animation: none; } }
.project {
  display: grid; grid-template-columns: 160px 1fr; gap: 24px;
  padding: 28px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
  transition: border-color 0.25s, transform 0.25s;
}
.project:hover { border-color: var(--accent); transform: translateY(-2px); }
.project-side { display: flex; flex-direction: column; gap: 8px; }
.project-id { font-size: 30px; font-weight: 600; color: var(--accent); opacity: 0.5; line-height: 1; }
.project-date { color: var(--muted-2); font-size: 12.5px; }
.project-main h3 { font-size: 21px; margin-bottom: 14px; }
.project-bullets { margin: 0 0 18px; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
.project-bullets li { position: relative; padding-left: 22px; color: var(--muted); font-size: 15px; }
.project-bullets li::before {
  content: ''; position: absolute; left: 4px; top: 9px;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
}
.project-link { margin-top: 18px; color: var(--accent); }
.project-link svg { width: 15px; height: 15px; transition: transform 0.2s; }
.project-link:hover { color: var(--text); }
.project-link:hover svg { transform: translateX(3px); }
.empty { color: var(--muted); padding: 30px; text-align: center; }

/* Skills ----------------------------------------------------------------- */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; }
.skill-card {
  padding: 26px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
}
.skill-card h3 { font-size: 14px; color: var(--accent); letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 10px; }
.skill-context { color: var(--muted); font-size: 14px; margin-bottom: 18px; }
.skill-items { display: flex; flex-wrap: wrap; gap: 8px; }
.skill {
  font-size: 13.5px; padding: 7px 13px; border-radius: 9px;
  color: var(--text); background: var(--bg-2);
  border: 1px solid var(--panel-line);
  display: inline-flex; align-items: center; gap: 6px;
}
.skill-link { cursor: pointer; font-family: var(--sans); transition: border-color 0.2s, color 0.2s, background 0.2s; }
.skill-link:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.skill-arrow { display: inline-flex; opacity: 0; width: 0; transition: opacity 0.2s, width 0.2s; }
.skill-arrow svg { width: 14px; height: 14px; }
.skill-link:hover .skill-arrow { opacity: 1; width: 14px; }

/* Contact ---------------------------------------------------------------- */
.contact-card {
  padding: 32px; border-radius: var(--radius);
  background: var(--panel); border: 1px solid var(--panel-line);
  max-width: 620px;
}
.email-list { display: grid; gap: 10px; }
.email-copy {
  display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%;
  padding: 16px 18px; border-radius: 12px; cursor: pointer;
  background: var(--bg-2); border: 1px solid var(--panel-line);
  color: var(--text); transition: border-color 0.2s;
}
.email-copy:hover { border-color: var(--accent); }
.email-details { display: grid; gap: 4px; text-align: left; min-width: 0; }
.email-label { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
.email-text { font-size: 16px; }
.copy-state { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); white-space: nowrap; }
.copy-state.done { color: var(--green); }

.contact-meta { display: flex; gap: 22px; flex-wrap: wrap; margin: 20px 2px; }
.meta-item { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14.5px; }
.contact-buttons { display: flex; gap: 12px; flex-wrap: wrap; }

.footer { margin-top: 50px; color: var(--muted-2); font-size: 12.5px; }

/* Reveal animation ------------------------------------------------------- */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}

/* Responsive ------------------------------------------------------------- */
@media (max-width: 900px) {
  .sidebar {
    position: sticky; top: 0; left: 0;
    width: 100%; height: auto;
    border-right: 0; border-bottom: 1px solid var(--panel-line);
    backdrop-filter: blur(10px);
    background: rgba(8, 18, 41, 0.9);
    padding: 14px 18px;
  }
  .sidebar-inner { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 10px 14px; min-height: 0; width: 100%; }
  .avatar { width: 52px; height: 52px; border-radius: 15px; flex: none; }
  .avatar-expand { display: none; }
  .side-id { flex: 1 1 auto; min-width: 0; }
  .side-name { font-size: 17px; white-space: nowrap; }
  .side-role, .badge-available { display: none; }
  .side-nav {
    order: 5; flex-basis: 100%; max-width: 100%;
    flex-direction: row; gap: 2px; margin: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; scrollbar-width: none;
  }
  .side-nav::-webkit-scrollbar { display: none; }
  .nav-link { padding: 7px 12px; white-space: nowrap; font-size: 14px; }
  .nav-tick { display: none; }
  .nav-link.active { color: var(--accent); }
  .side-social { order: 4; margin: 0; padding: 0; }
  .side-social a { width: 36px; height: 36px; }
  .main { margin-left: 0; padding: 0 20px; max-width: 100%; }
  .section { padding: 64px 0; }
  .choices, .highlight-grid { grid-template-columns: 1fr; }
  .featured-project { grid-template-columns: 1fr; }
  .featured-media { min-height: 0; aspect-ratio: 16 / 9; }
  .case-study { grid-template-columns: 1fr; }
  .project { grid-template-columns: 1fr; gap: 14px; padding: 22px; }
  .exp-card { padding: 22px; }
  .exp-card h3 { font-size: 18px; }
  .project-side { flex-direction: row; align-items: baseline; gap: 14px; }
  .stats { gap: 28px; }
}

@media (max-width: 560px) {
  body { font-size: 16px; }
  .side-social { display: none; }
  .stat-num { font-size: 30px; }
  .resume-frame { height: 70vh; }
  .contact-card { padding: 22px; }
  .email-copy { align-items: flex-start; padding: 14px; }
  .email-text { font-size: 13px; overflow-wrap: anywhere; }
}

@media (hover: none) {
  .preview-hint { display: none; }
}
`
