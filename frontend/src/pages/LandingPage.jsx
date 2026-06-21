import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Menu, 
  X, 
  Users, 
  Shield, 
  FileText, 
  Bell,
  CheckCircle,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">DebtTracker</span>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#overview" className="text-sm font-medium text-emerald-600">Overview</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">Features</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-slate-900">Testimonials</a>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">Sign In</Link>
              <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">Get Started</Link>
            </div>
            
            {/* Mobile toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white">
            <div className="px-4 py-6 space-y-4">
              <a href="#overview" className="block text-sm font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Overview</a>
              <a href="#features" className="block text-sm font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#pricing" className="block text-sm font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#testimonials" className="block text-sm font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link to="/login" className="text-center py-2.5 text-sm font-semibold text-slate-700">Sign In</Link>
                <Link to="/signup" className="text-center bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="overview" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                XisaabDeyn
                <span className="block text-emerald-600">Buuggii deynta u beddel digital.</span>
              </h1>
              <p className="text-lg text-slate-600">
                Simplify your business debt tracking with a secure, professional platform designed for modern shop owners in Somalia. Move away from paper ledgers to high-fidelity digital records.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold text-center transition-all">
                  Get Started
                </Link>
                <button className="px-8 py-3 rounded-xl font-semibold text-slate-700 border border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" 
                  alt="Dashboard preview"
                  className="rounded-2xl w-full shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Collection Rate</p>
                    <p className="text-emerald-600 font-bold">+24.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Modern Debt Management</h2>
            <p className="text-slate-600">Everything you need to manage your business credit with confidence.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Digital Debt Tracking</h3>
              <p className="text-slate-600 text-sm">
                Leave pen-and-paper transactions behind. Replace manual notebooks with a searchable, organized digital ledger that never loses a record.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Data</h3>
              <p className="text-slate-600 text-sm">
                Industry-grade encryption for all your records. Your financial data is backed up and accessible only to you.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Customer Profiles</h3>
              <p className="text-slate-600 text-sm">
                Manage client information, track important notes, and maintain a complete history of every interaction.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Easy Reporting</h3>
              <p className="text-slate-600 text-sm">
                Generate instant summaries and debt aging reports with a single click. Know exactly who owes what, when.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                <div>
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Reminders</h3>
                  <p className="text-slate-600 text-sm">
                    Set payment reminders and smart alerts to customers when their payments are due. Improve collection rates without the awkward phone calls.
                  </p>
                </div>
                <div className="lg:ml-auto">
                  <Bell className="w-12 h-12 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Trusted by Shop Owners</h2>
              <p className="text-slate-600 text-sm">Listen to how XisaabDeyn has transformed small businesses across the region.</p>
            </div>
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm mb-4 italic">
                  "Ma aragtay nolosha! qabsaday bi la'aan oo xisaabtayda ku jiray ka dib. Naxariisday saqadaan hawadane, waxaan hadda leeyahay xaqiijinta dhammaan deynta!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">AH</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Ahmed Hassan</p>
                    <p className="text-xs text-slate-500">Supermarket Owner</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm mb-4 italic">
                  "Thedebtpage reminders are a game-changer.Military-grade safety at its finest!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700">LO</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Layla Osman</p>
                    <p className="text-xs text-slate-500">Boutique Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">Choose the plan that fits your business size.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-slate-300">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Starter</h3>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black">$10</span>
                  <span className="text-slate-500 text-sm font-medium">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Up to 50 Customers
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Basic Reporting
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Email Support
                </li>
              </ul>
              <button className="w-full py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Select Plan
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-500 shadow-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Business</h3>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black">$25</span>
                  <span className="text-slate-500 text-sm font-medium">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Unlimited Customers
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Advanced Analytics
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  SMS Reminders
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Priority Support
                </li>
              </ul>
              <Link to="/signup" className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold text-center transition-colors">
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-300">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Premium</h3>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black">$50</span>
                  <span className="text-slate-500 text-sm font-medium">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Multiple Shop Locations
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  API Access
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Dedicated Account Manager
                </li>
              </ul>
              <button className="w-full py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">DebtTracker</span>
            </div>
            
            <div className="text-sm text-slate-500">
              © 2024 DebtTracker Frights. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900">Terms of Service</a>
              <a href="#" className="hover:text-slate-900">Contact Support</a>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-400 rounded-full" />
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
