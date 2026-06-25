'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const projects = [
  {
    title: 'Splitter Backend',
    description:
      'A high-concurrency expense-splitting engine built with Fiber and Go, utilizing MongoDB for persistent storage and Redis for session management.',
    image: '/splitter_backend.png',
    tags: ['Fiber', 'Go', 'MongoDB'],
  },
  {
    title: 'Goan Stickers',
    description:
      'Native Android application featuring localized sticker packs for the Goan community, reaching over 10k+ downloads.',
    image: '/goan_stickers.png',
    tags: ['Android SDK', 'Kotlin', 'Firebase'],
  },
  {
    title: 'Digital Menu',
    description:
      'SaaS platform for restaurants to digitize menus and manage orders in real-time using WebSocket technology.',
    image: '/dish_menu.png',
    tags: ['React', 'Node.js', 'Socket.io'],
  },
];

const experiences = [
  {
    title: '🚀 Senior Developer',
    company: 'Materialplus (Srijan)',
    location: 'Remote',
    period: 'Aug 2022 - Present',
    overview:
      'Worked on a large-scale data platform, building scalable backend systems and microservices for high-volume, data-intensive applications.',
    highlights: [
      'Designed and built microservices architecture using Node.js (NestJS) and TypeScript',
      'Developed high-performance REST APIs using Go (Golang), leveraging goroutines and concurrency patterns',
      'Improved service efficiency by using Go for CPU-intensive and parallel processing tasks',
      'Implemented event-driven systems with Kafka & RabbitMQ',
      'Optimized APIs and database queries for high-performance workloads',
      'Built real-time features using WebSockets',
      'Developed data generation tools using Python (Pandas)',
      'Implemented Redis caching to improve response times',
      'Created an audit service for tracking user activity and system changes',
      'Integrated monitoring and observability using Dynatrace',
    ],
    techStack: ['Node.js', 'NestJS', 'TypeScript', 'Go', 'Kafka', 'RabbitMQ', 'Redis', 'FastAPI', 'MongoDB', 'WebSockets', 'AWS', 'Python'],
  },
  {
    title: '⚙️ Senior Developer',
    company: 'Creative Capsule',
    location: 'Goa, India',
    period: 'Apr 2020 - Aug 2022',
    overview:
      'Built backend systems for transportation domain applications with a focus on scalability and event-driven communication.',
    highlights: [
      'Developed microservices using Node.js & NestJS',
      'Designed messaging workflows using RabbitMQ & Amazon MQ',
      'Integrated multiple AWS services (Lambda, Batch, Rekognition, SSM)',
      'Collaborated with clients on architecture and technical solutions',
      'Mentored developers and supported production systems',
    ],
    techStack: ['Node.js', 'NestJS', 'TypeScript', 'RabbitMQ', 'Amazon MQ', 'AWS Lambda', 'AWS Batch', 'SSM'],
  },
  {
    title: '🌐 Software Engineer',
    company: 'SJ Innovation',
    location: 'Goa, India',
    period: 'Dec 2018 - Apr 2020',
    overview:
      'Worked as a full-stack developer building scalable web and mobile applications using the MERN stack.',
    highlights: [
      'Built REST APIs and backend services',
      'Developed React-based web applications',
      'Created cross-platform mobile apps using React Native',
      'Delivered end-to-end features across frontend and backend',
    ],
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'React Native'],
  },
  {
    title: '📱 Android Developer',
    company: 'Svastek & Designway',
    location: 'Goa, India',
    period: '2017 - 2018',
    overview:
      'Started my career building Android applications and backend integrations, working on real-world mobile products across multiple domains.',
    highlights: [
      'Developed Android apps for food delivery, live events, and news platforms',
      'Built backend integrations using Firebase and REST APIs',
      'Managed complete app lifecycle from development to Play Store deployment',
      'Gained a strong foundation in mobile architecture and backend connectivity',
    ],
    techStack: ['Android', 'Java', 'Firebase', 'Node.js', 'REST APIs'],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    const headerOffset = 112;

    const setActiveState = (id: string) => {
      setActiveSection(id);

      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });

      sections.forEach((section) => {
        const isCurrent = section.id === id;
        section.classList.toggle('active-section', isCurrent);
        section.classList.toggle('section-highlight', isCurrent);
      });
    };

    const getCurrentSectionId = () => {
      let currentId = 'about';
      const viewportTop = headerOffset + 24;
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageBottom = document.documentElement.scrollHeight;

      if (scrollBottom >= pageBottom - 2) {
        return 'contact';
      }

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportTop && rect.bottom > viewportTop) {
          currentId = section.id;
        }
      });

      return currentId;
    };

    navLinks.forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href')?.replace('#', '');
        if (!targetId) {
          return;
        }

        event.preventDefault();
        const targetSection = document.querySelector<HTMLElement>(anchor.getAttribute('href')!);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setActiveState(targetId);
      });
    });

    const onScroll = () => {
      setActiveState(getCurrentSectionId());
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    setActiveState(getCurrentSectionId());

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex h-24 max-w-6xl items-center justify-between px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-gray-900">
            <span className="text-2xl font-bold text-gray-900">VP</span>
          </div>
          <div className="hidden gap-6 text-sm font-medium uppercase tracking-wide text-gray-600 md:flex">
            {['about', 'projects', 'experience', 'contact'].map((section) => (
              <a
                key={section}
                className={`nav-link rounded-full px-3 py-2 transition hover:text-gray-900 ${activeSection === section ? 'active' : ''}`}
                data-nav-link
                href={`#${section}`}
              >
                {section === 'projects' ? 'Portfolio' : section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="grow">
        <section className="flex min-h-[calc(100dvh-6rem)] flex-1 items-center justify-center px-8 text-center scroll-mt-24" data-section id="about">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
              Hello! My name is <br className="hidden md:block" />
              <span className="text-[#4ade80]">Vinil Prabhu.</span>
            </h1>
            <h2 className="mb-12 text-3xl font-medium text-gray-800 md:text-5xl">
              I&apos;m a senior full-stack &amp; backend engineer.
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a className="inline-block rounded-full border-2 border-gray-900 px-8 py-3 text-lg font-semibold text-gray-900 transition-all hover:bg-gray-900 hover:text-white" href="#projects">
                View Portfolio
              </a>
              <a className="ml-4 inline-block rounded-full border-2 border-[#4ade80] px-8 py-3 text-lg font-semibold text-gray-900 transition-all hover:bg-[#4ade80]" href="/Resume_Vinil_Prabhu.pdf" download>
                Download Resume
              </a>
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 bg-gray-50 px-8 py-24" data-section id="projects">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.title} className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <Image src={project.image} alt={project.title} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex grow flex-col p-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="mb-4 text-gray-600">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 px-8 py-24" data-section id="experience">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Experience</h2>
            <div className="space-y-12">
              {experiences.map((experience) => (
                <div key={experience.company} className="flex flex-col gap-6 border-b border-gray-100 pb-12 last:border-b-0 last:pb-0">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">{experience.title}</h3>
                    <p className="mb-2 text-lg font-semibold text-gray-800">{experience.company}</p>
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                      <span>📍 {experience.location}</span> | <span>🗓️ {experience.period}</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-900">Overview</h4>
                    <p className="text-gray-600">{experience.overview}</p>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">Key Highlights</h4>
                    <ul className="ml-5 list-disc space-y-2 text-gray-600">
                      {experience.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.techStack.map((tech) => (
                        <span key={tech} className="rounded-md bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 border-t border-gray-100 bg-gray-50 px-8 py-24" data-section id="contact">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">Ready to work together?</h2>
            <p className="mb-10 text-xl text-gray-600">
              I am currently open to consulting for high-performance backend architecture or full-time senior engineering roles.
            </p>
            <a className="inline-block rounded-full border-2 border-gray-900 bg-gray-900 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-white hover:text-gray-900" href="mailto:vinil@vinil.dev">
              Get in Touch
            </a>
            <div className="mt-8 flex justify-center gap-6">
              <a href="https://github.com/vinilprabhu" className="text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-gray-900">GitHub</a>
              <a href="https://www.linkedin.com/in/vinilprabhu" className="text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-gray-900">LinkedIn</a>
              <a href="https://stackoverflow.com/users/5895297/vinil-prabhu" className="text-sm font-medium uppercase tracking-wider text-gray-600 transition-colors hover:text-gray-900">Stack Overflow</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-gray-100 bg-white px-8 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Built with Next.js, Tailwind CSS &amp; deployed on Vercel</p>
          <p className="text-sm text-gray-500">© 2026 Vinil Prabhu</p>
        </div>
      </footer>
    </div>
  );
}
