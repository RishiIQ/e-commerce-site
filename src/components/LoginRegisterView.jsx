import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginRegisterView({ onLoginSuccess, showToast }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast('Please enter your email and password.');
      return;
    }

    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'admin@bowies.ca';
    const userName = name.trim() || (isAdmin ? 'Admin Director' : email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1));

    const loggedUser = {
      name: userName,
      email: email.trim(),
      phone: '+1 (514) 892-3310',
      tier: isAdmin ? 'Bowies Executive' : 'Bowies Elite Member',
      points: isSignup ? 500 : 1450,
      role: isAdmin ? 'admin' : 'customer',
      loggedIn: true,
      addresses: [
        { id: 1, title: 'Primary Residence', street: '1000 Rue Sherbrooke O', city: 'Montreal, QC', postal: 'H3A 3G4', country: 'Canada' }
      ]
    };

    onLoginSuccess(loggedUser);
    showToast(isSignup ? `Welcome to Bowies, ${userName}! +500 points awarded.` : `Welcome back, ${userName}!`);
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 animate-fade-in">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
        <a href='/'  className='flex justify-center items-center'>
          <img src="/bowies.png" alt="logo" className='w-7 h-7 rounded-xl mr-2' />
          <p className='text-3xl font-serif'>BOWIES</p>
        </a>
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-neutral-500 bg-neutral-100 px-3.5 py-1.5 rounded-full">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </span>
          <h2 className="font-serif text-2xl tracking-[0.1em] font-normal text-neutral-900 pt-2">
            {isSignup ? 'Join Bowies' : 'Sign In'}
          </h2>
          <p className="text-xs text-neutral-500 font-light">
            {isSignup ? 'Enter your details to create your membership profile.' : 'Access your order history, wishlist, and rewards.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Your Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Rishi" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full bg-neutral-50 border border-neutral-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
              <input 
                type="email" 
                placeholder="rishi@gmail.com (or admin@bowies.ca)" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-neutral-50 border border-neutral-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-neutral-50 border border-neutral-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
              />
            </div>
          </div>

          {isSignup && (
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required={isSignup}
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  className="w-full bg-neutral-50 border border-neutral-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-neutral-900 font-medium" 
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-neutral-900 text-white py-4 uppercase tracking-[0.2em] rounded-xl font-semibold hover:bg-neutral-800 transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2 mt-2"
          >
            <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-neutral-100">
          <button 
            type="button"
            onClick={() => { setIsSignup(!isSignup); setName(''); setConfirmPassword(''); }}
            className="text-xs text-neutral-600 hover:text-neutral-900 font-medium transition-colors cursor-pointer"
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}