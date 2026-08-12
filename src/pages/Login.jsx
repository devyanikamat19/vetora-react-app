import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center font-sans text-on-surface">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row h-screen md:h-[800px] bg-surface-container-lowest shadow-md overflow-hidden md:rounded-xl">
        {/* Image / Branding Side */}
        <div className="hidden md:flex md:w-1/2 relative bg-surface-variant items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDgZm5fQQXN4AZoPmswn-SEfn9wXFokArIftRYqPuKGVmYBU6unVokw5lQsBrderVk8aVHxWwjx-jiG24heCVKXzsGOFR21bX99KK6w13uIyPqGVCpsyD70fpl1wi3X9FFRB_LlUQUtWSUKrdWITZKI1FksWdY5V4FHkRtdwAoU6-7GdnofMKfW5IKcDWRaR9AsMSA87p7W0AsY5SCXcHlLhTqMWmxuemIz_1Ijgs7H2ECtda5HqdJO')" }}
          >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-xl text-on-primary">
            <h1 className="font-display text-4xl font-bold mb-md">Vetora</h1>
            <p className="font-display text-2xl font-light text-primary-fixed">Learn. Practice. Master.</p>
            <div className="mt-xxl w-16 h-1 bg-secondary-fixed rounded-full opacity-80"></div>
          </div>
        </div>
        {/* Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-16 py-12 h-full overflow-y-auto">
          <div className="w-full max-w-[450px] mx-auto">
            {/* Mobile Branding (Hidden on Desktop) */}
            <div className="md:hidden text-center mb-xl">
              <h1 className="font-display text-3xl font-bold text-primary">Vetora</h1>
              <p className="font-sans text-base text-on-surface-variant mt-2">Learn. Practice. Master.</p>
            </div>
            <div className="mb-xl text-left">
              <h2 className="font-display text-3xl font-semibold text-on-surface mb-2 hidden md:block">Welcome Back</h2>
              <p className="font-sans text-base text-on-surface-variant hidden md:block">Please sign in to continue to your dashboard.</p>
            </div>
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block font-sans text-sm font-medium text-on-surface mb-2" htmlFor="email">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">mail</span>
                  </div>
                  <input className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-0 focus:border-primary border-2 transition-all font-sans text-base placeholder-outline-variant" id="email" name="email" placeholder="you@example.com" required type="email" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block font-sans text-sm font-medium text-on-surface" htmlFor="password">Password</label>
                  <a className="font-sans text-xs font-semibold text-primary hover:text-primary-container transition-colors" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">lock</span>
                  </div>
                  <input className="block w-full pl-10 pr-3 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-0 focus:border-primary border-2 transition-all font-sans text-base placeholder-outline-variant" id="password" name="password" placeholder="••••••••" required type="password" />
                </div>
              </div>
              <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm font-sans text-sm font-medium text-on-primary bg-primary hover:bg-[#094449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]" type="submit">
                Sign In
              </button>
            </form>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface-container-lowest text-outline font-sans text-xs font-semibold">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-outline-variant rounded-lg shadow-sm bg-surface-container-lowest font-sans text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors items-center gap-2">
                  <span className="material-symbols-outlined text-lg">login</span>
                  Google
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-outline-variant rounded-lg shadow-sm bg-surface-container-lowest font-sans text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors items-center gap-2">
                  <span className="material-symbols-outlined text-lg">work</span>
                  LinkedIn
                </button>
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="font-sans text-base text-on-surface-variant">
                Don't have an account? 
                <a className="font-sans text-sm font-medium text-primary hover:underline decoration-2 underline-offset-4 ml-1" href="#">Join Now</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
