"use client";

import "./globals.css";
import { episodes } from "@/data/episodes";
import { ProjectCard } from "@/components/ProjectCard";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
  navigator.clipboard.writeText("matecolic2@gmail.com");
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
  };
  
  useEffect(() => {
    const cards = document.querySelectorAll('.projectCard, .contactCard, #projects-heading, #projects-paragraph, #contact-heading, #contact-paragraph');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => document.body.classList.remove('window-blurred');
    const handleBlur = () => document.body.classList.add('window-blurred');

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const navLinks = document.querySelectorAll('.inpageNav a') as NodeListOf<HTMLAnchorElement>;
    const sections = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>;

    let scrollTimeout: number | null = null;
    let clickMode = false;
    let clickTimeout: number | null = null;

    const setActiveLink = (id: string) => {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const handleNavClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const targetId = (target.getAttribute('href') || '').replace('#', '');
      clickMode = true;
      setActiveLink(targetId);

      if (clickTimeout) window.clearTimeout(clickTimeout);
      clickTimeout = window.setTimeout(() => {
        clickMode = false;
      }, 200);
    };

    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    const handleScroll = () => {
      if (clickMode) return;

      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        let current = '';
        let minDistance = Infinity;

        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance && distance < window.innerHeight / 2 && window.scrollY > window.innerHeight / 2) {
            minDistance = distance;
            current = section.getAttribute('id') || '';
          }
        });

        if (current) setActiveLink(current);
        else setActiveLink(''); // explicitly deselect
      }, 50); // faster highlighting
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      navLinks.forEach(link => link.removeEventListener('click', handleNavClick));
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      if (clickTimeout) window.clearTimeout(clickTimeout);
    };
  }, []);


  return (
    <main>
      <nav className="inpageNav" aria-label="Page Navigation">
        <a href="#about">About Me</a>
        <a href="#projects">My Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="welcome container">
        <p className="eyebrow">Welcome to my portfolio</p>
      </div>
      
      <div className="hero-triangle"></div>
      <div className="hero-triangle hero-triangle--small"></div>
      <div className="hero-triangle hero-triangle--small2"></div>
      
      <header className="hero" id="top">
        <div className="container">
          <h1>M C</h1>
          <h2>Software QA Engineer</h2>
          <p>
            I build reliable, scalable test automation with clean structure, strong validation, and consistent quality across web applications.
          </p>
          <a href="#contact" className="button accent contact-me">
            Contact Me
          </a>
        </div>
      </header>

      <section id="about" className="section" aria-labelledby="about-heading">
        <div className="container">
          <h2 id="about-heading">About Me</h2>
          <p>
            Passionate QA engineer with experience building and maintaining automated tests for modern web applications using tools like Playwright, Cypress, and Selenium. I focus on reliability, test coverage, and performance with quality as a first principle.
          </p>
          <ul>
            <li>Test automation with reliable, maintainable frameworks</li>
            <li>Structured test design with reusable components and fixtures</li>
            <li>Performance, stability, and coverage-focused quality assurance</li>
          </ul>
        </div>
      </section>

      <section id="projects" className="section" aria-labelledby="projects-heading">
        <div className="container">
          <h2 id="projects-heading">My Projects</h2>
          <p id="projects-paragraph">Some of my latest accomplishments and engineering growth.</p>
          <div className="projectsGrid">
            {episodes.map((episode) => (
              <ProjectCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section" aria-labelledby="contact-heading">
        <div className="container">
          <h2 id="contact-heading">Contact</h2>
          <p id="contact-paragraph">Want to work together? Reach out via email or LinkedIn.</p>
          <div className="contactGrid">
            <div className="contactCard">
              <h3>Email</h3>
                <div className="contactEmailWrapper">
                  <a
                    href="mailto:matecolic2@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button social"
                  >
                    matecolic2@gmail.com
                  </a>
                  <button
                    className="button copyButton"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
              </div>
            </div>
            <div className="contactCard">
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/mate-colic/" target="_blank" rel="noopener noreferrer" className="button social">
                linkedin.com/in/mate-colic
              </a>
            </div>
            <div className="contactCard">
              <h3>GitHub</h3>
              <a href="https://github.com/matecolic2" target="_blank" rel="noopener noreferrer" className="button social">
                github.com/matecolic2
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Mate Colic. Built with Next.js static export.</p>
        </div>
      </footer>

      {showToast && (
      <div className="toast">
        Email copied to clipboard
      </div>
      )}
    </main>
  );
}
