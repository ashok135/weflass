'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visualRef = useRef(null);
  const [repelPos, setRepelPos] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const handleVisualMouseMove = (e) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // Repel opposite the cursor direction
    const factor = -0.16;
    const maxOffset = 42;
    const rx = Math.max(-maxOffset, Math.min(maxOffset, dx * factor));
    const ry = Math.max(-maxOffset, Math.min(maxOffset, dy * factor));

    setRepelPos({ x: rx, y: ry });
    setIsHoveringCard(true);
  };

  const handleVisualTouchMove = (e) => {
    if (!visualRef.current || !e.touches[0]) return;
    const rect = visualRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;

    const factor = -0.16;
    const maxOffset = 42;
    const rx = Math.max(-maxOffset, Math.min(maxOffset, dx * factor));
    const ry = Math.max(-maxOffset, Math.min(maxOffset, dy * factor));

    setRepelPos({ x: rx, y: ry });
    setIsHoveringCard(true);
  };

  const handleVisualLeave = () => {
    setIsHoveringCard(false);
    setRepelPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    // Exact IntersectionObserver from original HTML
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.animate(
              [
                { opacity: 0, transform: 'translateY(35px)' },
                { opacity: 1, transform: 'none' },
              ],
              {
                duration: 700,
                easing: 'cubic-bezier(.2,.7,.2,1)',
                fill: 'forwards',
              }
            );
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(
      '.service, .step, .stat, .head, .statement, .cta, .contact'
    );
    elements.forEach((e) => {
      e.style.opacity = '0';
      io.observe(e);
    });

    return () => {
      io.disconnect();
    };
  }, []);

  const scrollTo = (selector) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thanks — your enquiry has been received.');
    e.target.reset();
  };

  return (
    <div className="wrap">
      <header className="nav">
        <a className="logo" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
          We<span>Flass</span>
        </a>

        {/* Desktop Links */}
        <nav className="links">
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}>Services</a>
          <a href="#approach" onClick={(e) => { e.preventDefault(); scrollTo('#approach'); }}>Approach</a>
          <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('#process'); }}>Process</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>Contact</a>
        </nav>

        {/* Desktop Start a Project Button */}
        <button className="btn" onClick={() => scrollTo('#contact')}>
          Start a project
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Mobile Menu Drawer */}
        <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : 'closed'}`}>
          <div className="mobile-menu-links">
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}>Services</a>
            <a href="#approach" onClick={(e) => { e.preventDefault(); scrollTo('#approach'); }}>Approach</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('#process'); }}>Process</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>Contact</a>
          </div>
          <button className="btn mobile-menu-btn" onClick={() => scrollTo('#contact')}>
            Start a project
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div>
            <div className="eyebrow">Digital marketing agency · India</div>
            <h1>Make your brand <span>impossible to ignore.</span></h1>
            <p className="lead">WeFlass helps creators, businesses and personal brands grow through social media, content, influencer marketing and performance advertising.</p>
            <div className="actions">
              <button className="btn" onClick={() => scrollTo('#contact')}>Let's grow together →</button>
              <button className="ghost" onClick={() => scrollTo('#services')}>Explore services</button>
            </div>
          </div>
          <div
            className="visual"
            ref={visualRef}
            onMouseMove={handleVisualMouseMove}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={handleVisualLeave}
            onTouchStart={() => setIsHoveringCard(true)}
            onTouchMove={handleVisualTouchMove}
            onTouchEnd={handleVisualLeave}
          >
            <div
              className={`circle ${isHoveringCard ? 'is-repelling' : ''}`}
              style={{
                transform: isHoveringCard
                  ? `translate3d(${repelPos.x}px, ${repelPos.y}px, 0)`
                  : undefined,
              }}
            >
              <div className="circle-ripple ripple-primary" aria-hidden="true"></div>
              <div className="circle-ripple ripple-secondary" aria-hidden="true"></div>
            </div>
            <small>WEFLASS / DIGITAL GROWTH</small>
            <strong>BUILD.<br />REACH.<br />GROW.</strong>
          </div>
        </section>

        <section className="stats">
          <div className="stat"><b>Social</b><span>Management & content</span></div>
          <div className="stat"><b>Creator</b><span>Growth & monetization</span></div>
          <div className="stat"><b>Performance</b><span>Meta advertising</span></div>
          <div className="stat"><b>Brand</b><span>Strategy & positioning</span></div>
        </section>

        <section className="section" id="services">
          <div className="head">
            <div>
              <div className="eyebrow">01 / What we do</div>
              <h2>One partner for your digital growth.</h2>
            </div>
            <p>From your first content calendar to a full-funnel advertising system, WeFlass combines creative thinking with practical marketing execution.</p>
          </div>
          <div className="services">
            <article className="service">
              <span className="num">01</span>
              <h3>Social Media Management</h3>
              <p>Complete Instagram and Facebook management for creators, personal brands and businesses.</p>
              <div className="tags"><span className="tag">Reels</span><span className="tag">Posts</span><span className="tag">Stories</span><span className="tag">Community</span></div>
            </article>
            <article className="service">
              <span className="num">02</span>
              <h3>Creator Monetization</h3>
              <p>Turn attention into income with brand collaborations, affiliate systems and creator positioning.</p>
              <div className="tags"><span className="tag">Media Kit</span><span className="tag">Brand Deals</span><span className="tag">Affiliate</span></div>
            </article>
            <article className="service">
              <span className="num">03</span>
              <h3>Personal Brand Strategy</h3>
              <p>Build a clear identity, content direction and 90-day roadmap around your audience and goals.</p>
              <div className="tags"><span className="tag">Audit</span><span className="tag">Positioning</span><span className="tag">Roadmap</span></div>
            </article>
            <article className="service">
              <span className="num">04</span>
              <h3>Digital Ads Management</h3>
              <p>Build and optimize Instagram and Facebook campaigns for awareness, leads, sales and growth.</p>
              <div className="tags"><span className="tag">Google Ads</span><span className="tag">Meta Ads</span><span className="tag">LinkedIn Ads</span></div>
            </article>
            <article className="service">
              <span className="num">05</span>
              <h3>Content Marketing</h3>
              <p>Strategic short-form content that educates, builds trust and gives your brand a reason to be remembered.</p>
              <div className="tags"><span className="tag">Reels Strategy</span><span className="tag">Copywriting</span></div>
            </article>
            <article className="service">
              <span className="num">06</span>
              <h3>Influencer Marketing</h3>
              <p>Find relevant creators, plan campaigns and coordinate collaborations that connect brands with real audiences.</p>
              <div className="tags"><span className="tag">Research</span><span className="tag">Outreach</span><span className="tag">Campaigns</span></div>
            </article>
          </div>
        </section>

        <section className="section dark" id="approach">
          <div className="statement">
            <div>
              <div className="eyebrow">02 / Our philosophy</div>
              <div className="quote">Attention is rented.<br /><span>Trust is built.</span></div>
            </div>
            <div>
              <p className="statement-lead">Marketing should not be about posting more. It should be about making every piece of communication move the brand forward.</p>
              <div className="list">
                <div className="row"><b>Strategy first</b><span>Clear goals before content</span></div>
                <div className="row"><b>Creative that converts</b><span>Ideas built for attention</span></div>
                <div className="row"><b>Data-informed growth</b><span>Measure, learn, optimize</span></div>
                <div className="row"><b>Long-term brand value</b><span>Build an audience you own</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="head">
            <div>
              <div className="eyebrow">03 / How we work</div>
              <h2>Simple process. Serious execution.</h2>
            </div>
            <p>A straightforward system designed to move from uncertainty to consistent marketing execution.</p>
          </div>
          <div className="process">
            <div className="step"><span className="num">01</span><h3>Discover</h3><p>Understand your brand, audience, competitors and business goals.</p></div>
            <div className="step"><span className="num">02</span><h3>Strategize</h3><p>Define positioning, content pillars, campaigns and measurable objectives.</p></div>
            <div className="step"><span className="num">03</span><h3>Create</h3><p>Produce high-quality content and campaigns built around the strategy.</p></div>
            <div className="step"><span className="num">04</span><h3>Optimize</h3><p>Review performance, identify opportunities and continuously improve.</p></div>
          </div>
        </section>

        <section className="cta">
          <div>
            <div className="eyebrow">Ready when you are</div>
            <h2>Your next stage of growth starts here.</h2>
            <p>Tell us what you're building. We'll help turn your digital presence into a growth system.</p>
          </div>
          <button className="btn" onClick={() => scrollTo('#contact')}>Start a conversation →</button>
        </section>

        <section className="section" id="contact">
          <div className="contact">
            <div>
              <div className="eyebrow">04 / Contact</div>
              <h2>Let's build something worth talking about.</h2>
              <p>Whether you are launching a brand, growing an audience or ready to scale with paid media, WeFlass is ready to help.</p>
            </div>
            <form className="form" onSubmit={handleFormSubmit}>
              <input required placeholder="Your name" />
              <input required type="email" placeholder="Email address" />
              <input placeholder="Business / brand name" />
              <textarea placeholder="Tell us about your goals..."></textarea>
              <button type="submit">Send enquiry →</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>WEFLASS</strong>
        <span>Digital marketing · Creator growth · Performance</span>
        <span>© 2026 WeFlass</span>
      </footer>
    </div>
  );
}
