import { 
  LayoutDashboard, 
  Users, 
  WalletCards, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus, 
  TrendingUp, 
  CheckCircle2,
  CreditCard
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  onOpenNewEntryModal, 
  preferences,
  onLogout
}) {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'debts', name: 'Debts', icon: WalletCards },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
  ];

  return (
    <aside id="app-sidebar" className="w-68 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 z-10">
      {/* Brand Logo */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold font-sans text-emerald-900 tracking-tight">
            Debt<span className="text-emerald-600">Tracker</span>
          </span>
        </div>
        
        {/* Merchant Info Tag */}
        <div className="mt-4 flex items-center gap-3 p-2.5 bg-emerald-50/70 border border-emerald-100/50 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-emerald-950 truncate leading-tight">
              {preferences?.shopName}
            </h4>
            <span className="text-[10px] text-emerald-600 font-medium tracking-wide uppercase">
              Verified Merchant
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              id={`nav-tab-${item.id}`}
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/30'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
              }`} />
              {item.name}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions Area */}
      <div className="p-4 border-t border-slate-100 space-y-4">
        {/* Quick entry button */}
        <button
          id="btn-sidebar-new-entry"
          onClick={onOpenNewEntryModal}
          className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-emerald-700/10 hover:shadow-emerald-700/20 cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5" />
          New Entry
        </button>

        {/* Footer actions */}
        <div className="space-y-1">
          <button
            id="nav-tab-settings"
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'settings'
                ? 'bg-slate-100 text-slate-800 font-semibold'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Merchant Settings
          </button>
          <button
            id="btn-sidebar-logout"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout Account
          </button>
        </div>
      </div>
    </aside>
  );
}
