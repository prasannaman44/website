import { useState, useEffect, useRef } from 'react'

/* ============================================================================
   EDITABLE CONTENT — everything you'd normally change lives in these constants.
   ========================================================================= */

// Set to '/profile.jpg' after you drop a photo into public/ for a permanent image.
const DEFAULT_IMAGE = ''

const PROFILE = {
  name: 'Prasanna Sairam',
  fullName: 'Prasanna Govindarajulu Sairam',
  role: 'Backend & Systems Engineer',
  thesis: 'I build the layers most people import.',
  bio: "Computer Science student at the University at Buffalo with a backend and systems focus. I've written an HTTP server, a bytecode interpreter, and a memory allocator from scratch — because the fastest way to understand a tool is to build it yourself.",
  email: 'prasannasairam05@gmail.com',
  phone: '(585) 485-2224',
  location: 'Buffalo, NY',
  github: 'https://github.com/prasannaman44',
  githubHandle: 'prasannaman44',
  linkedin: 'https://www.linkedin.com/in/prasanna-sairam-a00241290',
  linkedinHandle: 'prasanna-sairam',
}

const STATUS = {
  available: true,
  headline: 'Open to Summer 2026 internships',
  focus: ['Backend', 'Systems', 'Distributed Systems'],
}

const STATS = [
  { num: '5', label: 'projects shipped' },
  { num: '3', label: 'systems built from scratch' },
  { num: '6', label: 'languages' },
]

const HIGHLIGHTS = [
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

const EDUCATION = {
  school: 'University at Buffalo',
  detail: 'School of Engineering and Applied Sciences',
  degree: 'B.S. in Computer Science',
  graduation: 'Expected Spring 2027',
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
  },
  {
    id: '04',
    title: 'Escape from UB',
    date: 'Nov – Dec 2025',
    tags: ['Unreal Engine', 'C++'],
    bullets: [
      "Designed and built a horror survival game inspired by Five Nights at Freddy's, featuring camera surveillance, enemy AI, and player resource management.",
      'Implemented core gameplay systems including AI pathing, timed enemy movement, jumpscare triggers, and fail-state logic to build player tension.',
      'Created interactive UI elements such as camera feeds, control panels, and status indicators.',
    ],
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
  },
]

const SKILLS = [
  {
    group: 'Languages',
    context: 'What I write in. The systems work lives in C and OCaml; the web work in Python and JavaScript.',
    items: ['Java', 'Python', 'C', 'C++', 'OCaml', 'JavaScript', 'HTML/CSS'],
  },
  {
    group: 'Tools & Technologies',
    context: 'The stack behind the projects — data, real-time transport, auth, and the editors I live in.',
    items: ['MongoDB', 'WebSockets', 'bcrypt', 'Git', 'Unreal Engine', 'IntelliJ IDEA'],
  },
  {
    group: 'Concepts',
    context: 'The ideas I keep coming back to: how requests are served, how memory is managed, how programs are structured.',
    items: [
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
  camera: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
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
  const raf = useRef(0)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.body.classList.add('has-custom-cursor')
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...target }
    let hovering = false

    const isInteractive = (el) =>
      !!(el && el.closest && el.closest('a, button, [role="button"], input, label, .interactive'))

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      const next = isInteractive(e.target)
      if (next !== hovering) {
        hovering = next
        document.body.classList.toggle('cursor-hover', hovering)
      }
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (glow.current) glow.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    const onDown = () => document.body.classList.add('cursor-down')
    const onUp = () => document.body.classList.remove('cursor-down')
    const onLeave = () => document.body.classList.add('cursor-hidden')
    const onEnter = () => document.body.classList.remove('cursor-hidden')

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

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-down', 'cursor-hidden')
    }
  }, [])

  return (
    <>
      <div ref={glow} className="cursor-glow" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
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

/* ============================================================================
   APP
   ========================================================================= */

export default function App() {
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)
  const [photo, setPhoto] = useState(DEFAULT_IMAGE)
  const [filter, setFilter] = useState('All')
  const [copied, setCopied] = useState(false)
  const fileInput = useRef(null)
  const resumeWrap = useRef(null)
  const scrollRaf = useRef(0)

  useReveal()

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

  const onPhoto = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
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

  const initials = PROFILE.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))

  const allTags = ['All', ...FILTERS]

  return (
    <>
      <style>{CSS}</style>
      <CustomCursor />

      <div className="progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <a className="skip-link" href="#home">Skip to content</a>

      <div className="layout">
        {/* ---------------------------------------------------------------- */}
        {/* SIDEBAR */}
        {/* ---------------------------------------------------------------- */}
        <aside className="sidebar">
          <div className="sidebar-inner">
            <button
              className="avatar interactive"
              onClick={() => fileInput.current && fileInput.current.click()}
              title="Upload a profile photo"
              aria-label="Upload a profile photo"
            >
              {photo ? (
                <img src={photo} alt="Prasanna Sairam" />
              ) : (
                <span className="avatar-initials">{initials}</span>
              )}
              <span className="avatar-cam">{Icon.camera()}</span>
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={onPhoto}
              hidden
            />

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
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="interactive">
                {Icon.github()}
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="interactive">
                {Icon.linkedin()}
              </a>
              <a href={`mailto:${PROFILE.email}`} aria-label="Email" className="interactive">
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
              <button className="choice choice-resume interactive" onClick={() => goTo('resume')}>
                <span className="choice-icon">{Icon.doc()}</span>
                <span className="choice-body">
                  <span className="choice-title">My résumé</span>
                  <span className="choice-sub">The one-page version — read or download.</span>
                </span>
                <span className="choice-arrow">{Icon.arrow()}</span>
              </button>
              <button className="choice choice-projects interactive" onClick={() => goTo('projects')}>
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
              <p className="section-lead">Four projects that show how I think — start at the bottom of the stack and build up.</p>
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

          {/* RESUME ----------------------------------------------------- */}
          <section id="resume" className="section">
            <header className="section-head reveal">
              <span className="section-id mono">/ résumé</span>
              <h2>One page, the whole picture</h2>
              <p className="section-lead">Read it inline, download a copy, or open it full-screen.</p>
            </header>

            <div className="resume-actions reveal">
              <a className="btn btn-amber interactive" href="/resume.pdf" download>
                {Icon.download()} Download PDF
              </a>
              <button className="btn btn-ghost interactive" onClick={fullscreenResume}>
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
              <p className="section-lead">Filter by what it's made of.</p>
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

            <div className="project-list" key={filter}>
              {filteredProjects.map((p) => (
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
              <button className="email-copy interactive" onClick={copyEmail}>
                <span className="email-text mono">{PROFILE.email}</span>
                <span className={`copy-state${copied ? ' done' : ''}`}>
                  {copied ? (<>{Icon.check()} Copied</>) : (<>{Icon.copy()} Copy</>)}
                </span>
              </button>

              <div className="contact-meta">
                <span className="meta-item">{Icon.phone()} {PROFILE.phone}</span>
                <span className="meta-item">{Icon.pin()} {PROFILE.location}</span>
              </div>

              <div className="contact-buttons">
                <a className="btn btn-accent interactive" href={`mailto:${PROFILE.email}`}>
                  {Icon.mail()} Email me
                </a>
                <a className="btn btn-ghost interactive" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                  {Icon.github()} GitHub
                </a>
                <a className="btn btn-ghost interactive" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                  {Icon.linkedin()} LinkedIn
                </a>
              </div>
            </div>

            <footer className="footer mono">
              © {new Date().getFullYear()} {PROFILE.fullName} — built from scratch, of course.
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
.cursor-dot, .cursor-ring, .cursor-glow { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 950; }
.has-custom-cursor, .has-custom-cursor a, .has-custom-cursor button, .has-custom-cursor .interactive { cursor: none; }
.cursor-dot {
  width: 7px; height: 7px; margin: -3.5px 0 0 -3.5px;
  border-radius: 50%; background: var(--accent);
  transition: opacity 0.2s;
}
.cursor-ring {
  width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border: 1.5px solid rgba(91, 140, 255, 0.6); border-radius: 50%;
  transition: width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, background 0.2s;
}
.cursor-glow {
  width: 360px; height: 360px; margin: -180px 0 0 -180px; border-radius: 50%;
  background: radial-gradient(circle, rgba(91, 140, 255, 0.10), transparent 65%);
  transition: width 0.3s, height 0.3s, margin 0.3s;
}
.cursor-hover .cursor-ring {
  width: 54px; height: 54px; margin: -27px 0 0 -27px;
  border-color: var(--amber); background: rgba(240, 182, 75, 0.08);
}
.cursor-hover .cursor-glow { width: 460px; height: 460px; margin: -230px 0 0 -230px; }
.cursor-down .cursor-ring { width: 26px; height: 26px; margin: -13px 0 0 -13px; }
.cursor-hidden .cursor-dot, .cursor-hidden .cursor-ring, .cursor-hidden .cursor-glow { opacity: 0; }

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
  width: 92px; height: 92px;
  border-radius: 22px;
  border: 1px solid var(--panel-line);
  background: var(--panel);
  padding: 0; overflow: hidden;
  display: grid; place-items: center;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
}
.avatar:hover { transform: translateY(-2px); border-color: var(--accent); box-shadow: 0 10px 30px rgba(91, 140, 255, 0.25); }
.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar-initials { font-family: var(--mono); font-size: 30px; font-weight: 600; color: var(--accent); }
.avatar-cam {
  position: absolute; right: 5px; bottom: 5px;
  width: 24px; height: 24px; border-radius: 8px;
  background: rgba(8, 18, 41, 0.82); color: var(--text);
  display: grid; place-items: center;
  opacity: 0; transition: opacity 0.2s;
}
.avatar:hover .avatar-cam { opacity: 1; }

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
  color: var(--text); font-family: var(--sans);
  transition: transform 0.25s, border-color 0.25s, background 0.25s;
}
.choice:hover { transform: translateY(-3px); }
.choice-icon { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; flex: none; }
.choice-resume .choice-icon { background: var(--amber-soft); color: var(--amber); }
.choice-resume:hover { border-color: var(--amber); background: linear-gradient(180deg, var(--panel), rgba(240,182,75,0.05)); }
.choice-projects .choice-icon { background: var(--accent-soft); color: var(--accent); }
.choice-projects:hover { border-color: var(--accent); background: linear-gradient(180deg, var(--panel), rgba(91,140,255,0.05)); }
.choice-body { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.choice-title { font-size: 18px; font-weight: 600; }
.choice-sub { color: var(--muted); font-size: 13.5px; }
.choice-arrow { color: var(--muted); transition: transform 0.25s, color 0.25s; flex: none; }
.choice:hover .choice-arrow { transform: translateX(4px); color: var(--text); }

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
.email-copy {
  display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%;
  padding: 16px 18px; border-radius: 12px; cursor: pointer;
  background: var(--bg-2); border: 1px solid var(--panel-line);
  color: var(--text); transition: border-color 0.2s;
}
.email-copy:hover { border-color: var(--accent); }
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
  .avatar { width: 44px; height: 44px; border-radius: 13px; flex: none; }
  .avatar-initials { font-size: 15px; }
  .avatar-cam { display: none; }
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
  .project { grid-template-columns: 1fr; gap: 14px; padding: 22px; }
  .project-side { flex-direction: row; align-items: baseline; gap: 14px; }
  .stats { gap: 28px; }
}

@media (max-width: 560px) {
  body { font-size: 16px; }
  .side-social { display: none; }
  .stat-num { font-size: 30px; }
  .resume-frame { height: 70vh; }
}
`
