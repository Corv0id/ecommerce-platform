"use client";

import { useState } from "react";
import { ShieldAlert, Search, Filter, AlertTriangle, Info, CheckCircle2, Terminal } from "lucide-react";

const mockLogs = [
  { id: "log-001", time: "Just now", user: "admin@luxe.com", action: "Configured System Settings", severity: "INFO", ip: "192.168.1.42" },
  { id: "log-002", time: "2 mins ago", user: "system_daemon", action: "Failed DB connection attempt", severity: "CRITICAL", ip: "10.0.0.5" },
  { id: "log-003", time: "15 mins ago", user: "merchant_lm@luxe.com", action: "Multiple failed login attempts", severity: "WARNING", ip: "172.16.254.1" },
  { id: "log-004", time: "1 hour ago", user: "system_daemon", action: "Automated daily backup completed", severity: "SUCCESS", ip: "localhost" },
  { id: "log-005", time: "3 hours ago", user: "admin@luxe.com", action: "Promoted user ID #492 to MERCHANT", severity: "INFO", ip: "192.168.1.42" },
  { id: "log-006", time: "5 hours ago", user: "unknown", action: "Blocked brute force attack", severity: "CRITICAL", ip: "45.22.19.11" },
  { id: "log-007", time: "1 day ago", user: "admin@luxe.com", action: "Updated catalog taxonomy", severity: "INFO", ip: "192.168.1.42" },
];

export default function AdminLogsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "WARNING": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "SUCCESS": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "WARNING": return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case "SUCCESS": return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Simulate file download
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,ID,Time,User,Action,Severity,IP\n';
      link.download = 'audit_logs.csv';
      link.click();
    }, 1500);
  };

  const filteredLogs = mockLogs.filter(log => {
    const matchesSeverity = filterSeverity ? log.severity === filterSeverity : true;
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || log.user.toLowerCase().includes(searchQuery.toLowerCase()) || log.ip.includes(searchQuery);
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            System Audit Logs
            <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              Live Feed
            </span>
          </h1>
          <p className="text-slate-400 mt-2">Monitor security events, system alerts, and administrative actions.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-slate-900 text-slate-300 px-4 py-2 rounded-xl font-medium border border-slate-800 hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4" />
              Filter Severity
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-2 z-10">
                <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase">Severity Level</div>
                <button onClick={() => { setFilterSeverity(null); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm rounded-lg ${filterSeverity === null ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>All Levels</button>
                <button onClick={() => { setFilterSeverity('CRITICAL'); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm text-red-500 rounded-lg ${filterSeverity === 'CRITICAL' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>Critical</button>
                <button onClick={() => { setFilterSeverity('WARNING'); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm text-amber-500 rounded-lg ${filterSeverity === 'WARNING' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>Warning</button>
                <button onClick={() => { setFilterSeverity('INFO'); setIsFilterOpen(false); }} className={`w-full text-left px-3 py-2 text-sm text-blue-500 rounded-lg ${filterSeverity === 'INFO' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>Info</button>
              </div>
            )}
          </div>
          <button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2 bg-slate-100 text-slate-900 px-6 py-2 rounded-xl font-bold hover:bg-white transition-colors disabled:opacity-70">
            {isExporting ? <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> : <Terminal className="w-4 h-4" />}
            {isExporting ? 'Exporting...' : 'Export Logs'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs by IP, User, or Action..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium w-12">Level</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Event/Action</th>
                <th className="px-6 py-4 font-medium">Target/User</th>
                <th className="px-6 py-4 font-medium">Source IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-mono">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No logs found matching your criteria.</td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        {getSeverityIcon(log.severity)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{log.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${getSeverityStyle(log.severity)}`}>
                          {log.severity}
                        </span>
                        <span className="text-slate-300">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-400">{log.user}</td>
                    <td className="px-6 py-4 text-slate-500">{log.ip}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-center">
          <p className="text-xs text-slate-500 font-mono">Showing {filteredLogs.length} events. Powered by ElasticSearch.</p>
        </div>
      </div>
    </div>
  );
}
