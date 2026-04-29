import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Phone } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupMethod, setSignupMethod] = useState('email');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupMethod === 'email' && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const contactInfo = signupMethod === 'email' ? { email } : { phone };
    signup({ name, ...contactInfo });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <img src="/LOGO.png" alt="Attire Logo" className="h-12 mx-auto mb-8" />
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">Join the exclusive collective</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex bg-gray-50 p-1 rounded-sm border border-gray-200">
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-bold transition-all ${signupMethod === 'email' ? 'bg-white shadow-sm text-blue-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setSignupMethod('email')}
            >
              Email
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-bold transition-all ${signupMethod === 'phone' ? 'bg-white shadow-sm text-blue-900 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setSignupMethod('phone')}
            >
              Phone Number
            </button>
          </div>

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {signupMethod === 'email' ? (
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          {signupMethod === 'email' && (
            <>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-gold focus:bg-white px-12 py-4 rounded-sm outline-none transition-all font-medium"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="flex items-start gap-3 py-2">
            <input type="checkbox" required className="mt-1 accent-black" id="terms" />
            <label htmlFor="terms" className="text-[10px] md:text-xs text-gray-500 uppercase font-bold leading-tight">
              I agree to the terms of service and privacy policy of ATTIRE fashion.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-sm hover:bg-brand-gold transition-colors group shadow-xl"
          >
            Create Account
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <p className="mt-12 text-center text-sm font-medium text-gray-500">
          Already have an account? {' '}
          <Link to="/login" className="text-black font-black uppercase tracking-widest border-b-2 border-brand-gold pb-0.5 ml-1">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
