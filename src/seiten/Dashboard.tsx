import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Inbox, 
    BarChart3, 
    Settings, 
    Search, 
    Bell, 
    MoreHorizontal,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    Phone,
    LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '@/lib/supabase';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Alle');
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/login');
        }
    };

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Fehler beim Laden der Leads:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
        fetchLeads();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Neu': return "bg-blue-50 text-blue-600";
            case 'In Bearbeitung': return "bg-amber-50 text-amber-600";
            case 'Erledigt': return "bg-emerald-50 text-emerald-600";
            default: return "bg-slate-50 text-slate-600";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    const stats = {
        neu: leads.filter(l => l.status === 'Neu').length,
        gesamt: leads.length,
        hoch: leads.filter(l => l.priority === 'Hoch').length
    };

    const filteredLeads = leads.filter(l => activeTab === 'Alle' || l.category.includes(activeTab));

    return (
        <div className="min-h-screen bg-hintergrund-hell flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-marke-primaer rounded-xl flex items-center justify-center shadow-lg shadow-marke-primaer/20">
                            <LayoutDashboard className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-black text-marke-sekundaer text-xl tracking-tight">Admin</span>
                    </div>

                    <nav className="space-y-1.5">
                        {[
                            { name: 'Anfragen', icon: Inbox },
                            { name: 'Statistik', icon: BarChart3 },
                            { name: 'Kunden', icon: Users },
                            { name: 'Einstellungen', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab('Alle')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                    activeTab === 'Alle' && item.name === 'Anfragen'
                                        ? "bg-marke-primaer text-white shadow-lg shadow-marke-primaer/20" 
                                        : "text-slate-500 hover:bg-slate-50"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-8">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-2">Support</p>
                        <p className="text-xs text-slate-600 font-medium">Fragen zum System?</p>
                        <a href="mailto:support@simply-switch.de" className="text-marke-primaer text-xs font-bold hover:underline">Hilfe erhalten</a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-96">
                        <Search className="w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Anfragen suchen..." className="bg-transparent border-none focus:ring-0 text-sm w-full" />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-marke-primaer transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-marke-sekundaer">Sven Kegler</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm mr-4">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sven" alt="Profile" />
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                title="Abmelden"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-marke-sekundaer mb-2">Dashboard</h1>
                                <p className="text-slate-500 font-medium">Willkommen zurück, Sven. Hier sind die neuesten Leads.</p>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={fetchLeads}
                                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    Aktualisieren
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-marke-sekundaer border border-marke-sekundaer rounded-xl text-sm font-bold text-white hover:bg-marke-primaer transition-all shadow-lg">
                                    Exportieren
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {[
                                { label: 'Neue Leads', value: stats.neu.toString(), icon: Inbox, color: 'bg-blue-500' },
                                { label: 'Gesamt Leads', value: stats.gesamt.toString(), icon: Users, color: 'bg-indigo-500' },
                                { label: 'Hohe Prio', value: stats.hoch.toString(), icon: AlertCircle, color: 'bg-red-500' },
                                { label: 'Ø Reaktionszeit', value: '1.2h', icon: Clock, color: 'bg-amber-500' },
                            ].map((kpi) => (
                                <motion.div
                                    key={kpi.label}
                                    whileHover={{ y: -4 }}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", kpi.color)}>
                                            <kpi.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium mb-1">{kpi.label}</p>
                                    <h4 className="text-2xl font-black text-marke-sekundaer">{kpi.value}</h4>
                                </motion.div>
                            ))}
                        </div>

                        {/* Leads Table */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-bold text-marke-sekundaer">Aktuelle Anfragen</h3>
                                <div className="flex gap-2">
                                    {['Alle', 'Beamtenversicherung', 'Existenzgründer', 'Privat'].map((f) => (
                                        <button 
                                            key={f}
                                            className={cn(
                                                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                                                activeTab === f ? "bg-marke-primaer text-white shadow-md" : "bg-slate-50 text-slate-400 hover:text-slate-600"
                                            )}
                                            onClick={() => setActiveTab(f)}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Name</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Kategorie</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Priorität</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Datum</th>
                                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Aktion</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                                                    Leads werden geladen...
                                                </td>
                                            </tr>
                                        ) : filteredLeads.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                                                    Keine passenden Anfragen gefunden.
                                                </td>
                                            </tr>
                                        ) : filteredLeads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs uppercase">
                                                            {lead.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-marke-sekundaer">{lead.name}</p>
                                                            <p className="text-[10px] text-slate-400">{lead.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-600">
                                                    {lead.category}
                                                    {lead.sub_category && <span className="block text-[10px] text-slate-400">{lead.sub_category}</span>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                        getStatusColor(lead.status)
                                                    )}>
                                                        {lead.status === 'Neu' && <AlertCircle className="w-3 h-3" />}
                                                        {lead.status === 'In Bearbeitung' && <Clock className="w-3 h-3" />}
                                                        {lead.status === 'Erledigt' && <CheckCircle2 className="w-3 h-3" />}
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "text-[10px] font-black",
                                                        lead.priority === 'Hoch' ? "text-red-500" :
                                                        lead.priority === 'Mittel' ? "text-amber-500" :
                                                        "text-slate-400"
                                                    )}>
                                                        {lead.priority}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-slate-400">{formatDate(lead.created_at)}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button 
                                                            onClick={() => window.open(`https://wa.me/${lead.phone?.replace(/\D/g, '')}`)}
                                                            className="p-2 text-slate-300 hover:text-green-500 transition-colors opacity-0 group-hover:opacity-100"
                                                            title="WhatsApp Chat"
                                                        >
                                                            <Phone className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 text-slate-300 hover:text-marke-primaer transition-colors opacity-0 group-hover:opacity-100">
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
