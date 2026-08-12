import React from 'react';
import { Link } from 'react-router-dom';

const featuredCourses = [
  {
    tag: 'Clinical Practice', tagBg: 'bg-primary-container/20 text-primary',
    title: 'Small Animal Clinical Medicine',
    desc: 'Comprehensive diagnostics and treatment protocols for common canine and feline conditions.',
    duration: '40 Hours', level: 'Expert Led',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_jKqb0JTsoV-ZA-5tZ20ypqWGrfKp7iA2TfKj2jpAEAsb9ncndToDn1NCdXc4neY4pv4BbDQ-_VuZyBkImeRjkUFQ8c0vNmsQr3ZmtQcZmS6iucEUnG7Y0oHmaAltAPUoizFP4iY6WXOuk8Jprrss57yvTLTDI2zGhDKNvgq06p2Dwg0JZyfTLwsDh6DoGFQl4dvpUAa1hEEiJdkNn59dFrWmhkL21ra39T8M84uuZhPYGEw66WJY',
  },
  {
    tag: 'Radiology', tagBg: 'bg-secondary-container/30 text-on-secondary-fixed-variant',
    title: 'Diagnostic Imaging Mastery',
    desc: 'Advanced interpretation of radiographs, ultrasound, and MRI scans in veterinary practice.',
    duration: '35 Hours', level: 'Certification',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqXQHxVHiStr8XFI8R-QLK7J3RiKZpe9xxDe7KnP3e2DdTlAcHKG88zairbzTh1gucKZKMvwDGLIx9hfdyeVqVXyK3feZc_bP6YqfjX1s8nmp9sU9Fq1Bit56CAOE5px_3esDwxpEki0mhx8kQzdbL-H8MV77R-7bFEcIcY_Sbv9F5XEeZrEZ6pLFuu1dyLRMiSCioSstcl7OTFNr8G34phINwGZZTRCvR36GmMxPdzvXJWHEMhm7N',
  },
  {
    tag: 'Critical Care', tagBg: 'bg-error-container/50 text-on-error-container',
    title: 'Emergency & Critical Care',
    desc: 'Triage, stabilization, and intensive care management for life-threatening animal emergencies.',
    duration: '50 Hours', level: 'Advanced',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCEXoYUTWXEujG6DZw0TINtU-ZzwdIu6JDI2w90KHO6YBV8ZcKW7ay7psvy2E2SAeAyCg7LfSpz3W8s269jb-fPzsqPRlukpvrZo-QmZKE-gJxWo0otsyEV-bUrumk7zHW-tRsszIRUowxJr5YL8r4Y3gKO-rUJtAjo-UAHcqH795hM1-c1S9Ix1pWgnAad8nUcSAzxRWCb4NDSg40tZVA-k413HscW7vo9WGZ85QxLTPfBgYMsAD',
  },
];

const stats = [
  { value: '15k+', label: 'Active Students' },
  { value: '200+', label: 'Expert Instructors' },
  { value: '98%', label: 'Exam Pass Rate' },
  { value: '50+', label: 'Partner Clinics' },
];

const Landing = () => {
  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="bg-surface border-b border-outline-variant flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <span className="font-display text-2xl font-bold text-primary">Vetora</span>
          <div className="hidden md:flex gap-6">
            <a className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Courses</a>
            <a className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Institutions</a>
            <a className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input className="pl-10 pr-4 py-2 bg-surface-container rounded-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-sans text-sm w-48" placeholder="Search..." type="text" />
          </div>
          <Link to="/login" className="font-sans text-sm text-primary font-medium hover:text-primary-fixed-dim transition-colors">Sign In</Link>
          <Link to="/onboarding" className="bg-primary text-on-primary font-sans text-sm px-4 py-2 rounded-full hover:bg-surface-tint transition-colors">Join Now</Link>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-16 py-12 md:py-24 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="font-display text-5xl md:text-6xl text-on-background leading-tight tracking-tight">
              Veterinary education, <span className="text-primary">redesigned</span> for modern learners.
            </h1>
            <p className="font-sans text-lg text-on-surface-variant max-w-[500px]">
              Vetora combines expert-led courses, interactive clinical simulations, and AI-powered assistance to help you master the art of veterinary medicine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore" className="bg-primary text-on-primary font-sans text-sm px-6 py-3 rounded-full hover:bg-surface-tint transition-colors shadow-sm">
                Explore Courses
              </Link>
              <Link to="/onboarding" className="border border-primary text-primary font-sans text-sm px-6 py-3 rounded-full hover:bg-surface-container-low transition-colors">
                Start Learning
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-[460px] rounded-2xl overflow-hidden shadow-lg border border-outline-variant">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUPhbXevacpLHGW7-i4fnhBgRh9QDU6lb_MYaQj50dawyRlA7jOUF5TksMbj8UYM-1Sfq9XfQmnaWD1RmcGq9zEiEcHFCnRpQGuh2g63QHDJIxaXRfv1ffD5QsfySkaEpuUfG1q5G2VLnu-lhZyKTJEJP61I5rW1h7NeqHDZsS02vEh94jPglWKYEOA8yaSWkwsoWkiE8yIaEKEG2JzIOoPcFPsr63gQUNpH0nwlwCVvGdWEwCZ9zG"
              alt="Vetora Platform Preview"
            />
          </div>
        </section>

        {/* Trusted by section */}
        <section className="bg-surface-container-low py-8 border-y border-outline-variant">
          <div className="max-w-7xl mx-auto px-4 md:px-16 text-center space-y-4">
            <p className="font-sans text-xs text-on-surface-variant uppercase tracking-wider">Trusted by top veterinary institutions</p>
            <div className="flex justify-center items-center gap-8 md:gap-24 opacity-60 grayscale flex-wrap">
              {['Royal Vet College', 'Cornell Vet', 'UC Davis VM', 'Penn Vet'].map(inst => (
                <span key={inst} className="font-display text-2xl font-bold">{inst}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="max-w-7xl mx-auto px-4 md:px-16 py-12 space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="font-display text-3xl text-on-background">Featured Courses</h2>
            <Link to="/explore" className="font-sans text-sm text-primary hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map(c => (
              <div key={c.title} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-4 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-[0px_8px_16px_rgba(13,92,99,0.12)] hover:-translate-y-0.5">
                <div className="h-48 rounded-lg bg-surface-container overflow-hidden">
                  <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={c.img} alt={c.title} />
                </div>
                <div>
                  <span className={`font-sans text-xs ${c.tagBg} px-2 py-1 rounded`}>{c.tag}</span>
                  <h3 className="font-display text-2xl mt-2">{c.title}</h3>
                  <p className="font-sans text-base text-on-surface-variant mt-2">{c.desc}</p>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-outline-variant">
                  <span className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> {c.duration}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">school</span> {c.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Vetora Experience */}
        <section className="bg-surface-container py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-display text-3xl text-on-background">The Vetora Experience</h2>
              <p className="font-sans text-lg text-on-surface-variant">Immersive learning tools designed to bridge the gap between theory and clinical reality.</p>
            </div>
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                </div>
                <h3 className="font-display text-2xl text-on-background">Interactive Clinical Simulations</h3>
                <p className="font-sans text-base text-on-surface-variant">Step into realistic virtual cases. Make diagnostic decisions, interpret test results, and prescribe treatments in a risk-free environment that builds clinical confidence.</p>
                <Link to="/clinical" className="font-sans text-sm text-primary font-semibold flex items-center gap-2 hover:underline mt-4">
                  Try a Simulation <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="lg:col-span-7 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-md order-1 lg:order-2 h-[400px]">
                <img className="w-full h-full object-cover rounded-xl border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUPhbXevacpLHGW7-i4fnhBgRh9QDU6lb_MYaQj50dawyRlA7jOUF5TksMbj8UYM-1Sfq9XfQmnaWD1RmcGq9zEiEcHFCnRpQGuh2g63QHDJIxaXRfv1ffD5QsfySkaEpuUfG1q5G2VLnu-lhZyKTJEJP61I5rW1h7NeqHDZsS02vEh94jPglWKYEOA8yaSWkwsoWkiE8yIaEKEG2JzIOoPcFPsr63gQUNpH0nwlwCVvGdWEwCZ9zG" alt="Clinical Simulation" />
              </div>
            </div>
            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-md h-[400px]">
                <img className="w-full h-full object-cover rounded-xl border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwuVFE0PQlDH41zTSCJZ6UcsLJ0kcs1_PbArNbPONWmkntAh4Dg1vCK7XF7CtRECvcwczR0_2VpoSKeMFBN7FbhQXw0F5KSAGkijJgKG1vxnTNsLw60Ilnl94LUxRf6nXE_fmg43b5lqWIc49SNYIIxdJHrULfiDE8qhJKI7sOvirqtGnaVwZyXGmLkG8pt-zzQOyQoUCZ6qeKOKwKAzJP-hHJGhOdRN2R3dSMjE8pzhHriDOa1VQc" alt="AI Assistant" />
              </div>
              <div className="lg:col-span-5 space-y-4 lg:pl-6">
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <h3 className="font-display text-2xl text-on-background">Vetora AI Study Assistant</h3>
                <p className="font-sans text-base text-on-surface-variant">Stuck on a complex concept? Vetora AI acts as your personal tutor, generating instant explanations, custom flashcards, and summarizing lengthy medical journals based on your progress.</p>
                <button className="font-sans text-sm text-primary font-semibold flex items-center gap-2 hover:underline mt-4">
                  Discover Vetora AI <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof & CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-16 py-12 text-center space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-outline-variant border-y border-outline-variant py-8">
            {stats.map(s => (
              <div key={s.label}>
                <h4 className="font-display text-5xl font-bold text-primary">{s.value}</h4>
                <p className="font-sans text-sm text-on-surface-variant mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto bg-surface-bright p-8 rounded-2xl border border-outline-variant shadow-sm relative mt-8">
            <span className="material-symbols-outlined absolute top-4 left-4 text-4xl text-outline-variant opacity-30">format_quote</span>
            <p className="font-sans text-lg text-on-background italic relative z-10 px-4 pt-4">
              "The interactive simulations on Vetora completely changed how I approach diagnostic imaging. It feels like having a senior radiologist looking over my shoulder, guiding every decision."
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBinYEIJT_m6j5BCnUveahDSkQAfabm9DcMmgm_gYPdBwnzdt5rKwAgrhe8Xc-Ff8NxmiUa8kUAlATQUAZqu2_zPu-TpbkzmsuNREWcjE5JCI4l8fq9AbAEeC82kONgHVPsJ6amFfgFtZ_OgfcSAHYwbp99bQe79luJAwrkGmOaUMdd6ghTYLDJ7tiqED0UR1x2n11L9RELwpapwvz_24VIS9osTAP6oyM07RvJmQz7vPdKvBr3MBId" alt="Dr. Sarah Jenkins" />
              </div>
              <div className="text-left">
                <p className="font-sans text-sm text-on-background font-bold">Dr. Sarah Jenkins</p>
                <p className="font-sans text-xs text-on-surface-variant">Recent Graduate, Cornell Vet</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-primary text-on-primary rounded-2xl p-12 mt-12 shadow-lg">
            <h2 className="font-display text-5xl mb-4">Join the next generation of veterinary professionals.</h2>
            <p className="font-sans text-lg text-on-primary-container mb-8 max-w-2xl mx-auto">
              Start your journey today and gain access to the most comprehensive digital veterinary curriculum available.
            </p>
            <Link to="/onboarding" className="bg-on-primary text-primary font-sans text-lg px-8 py-4 rounded-full hover:bg-surface-container-lowest transition-colors shadow-md inline-block">
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center px-16 py-8 w-full">
        <div className="font-display text-xl font-bold text-primary mb-4 md:mb-0">Vetora</div>
        <div className="font-sans text-xs text-on-surface-variant text-center md:text-left mb-4 md:mb-0">
          © 2024 Vetora Veterinary Education. Precision and Empathy.
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {['Privacy Policy', 'Terms of Service', 'Faculty Portal', 'Support Center'].map(link => (
            <a key={link} className="font-sans text-xs text-on-surface-variant hover:text-primary underline transition-colors" href="#">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Landing;
