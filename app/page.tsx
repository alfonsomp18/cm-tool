import { Verified, AlertTriangle, CheckCircle, Clock, Download, Eye, Trash2, Plus, Search, Filter } from 'lucide-react';

interface CertificateItem {
  id: string;
  domain: string;
  issuer: string;
  status: 'active' | 'expiring' | 'expired';
  issuedDate: string;
  expiryDate: string;
  daysLeft: number;
}

const certificates: CertificateItem[] = [
  {
    id: '1',
    domain: 'example.com',
    issuer: 'Let\'s Encrypt',
    status: 'active',
    issuedDate: '2024-01-15',
    expiryDate: '2025-01-15',
    daysLeft: 218,
  },
  {
    id: '2',
    domain: 'api.example.com',
    issuer: 'Let\'s Encrypt',
    status: 'expiring',
    issuedDate: '2023-12-01',
    expiryDate: '2024-12-01',
    daysLeft: 28,
  },
  {
    id: '3',
    domain: 'old.example.com',
    issuer: 'DigiCert',
    status: 'expired',
    issuedDate: '2023-06-01',
    expiryDate: '2024-06-01',
    daysLeft: -10,
  },
  {
    id: '4',
    domain: 'cdn.example.com',
    issuer: 'Let\'s Encrypt',
    status: 'active',
    issuedDate: '2024-03-10',
    expiryDate: '2025-03-10',
    daysLeft: 273,
  },
];

export default function CertificateManager() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Verified className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Certificate Manager Tool</h1>
            </div>
            <button className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Certificate
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium mb-1">Total Certificates</p>
                <p className="text-3xl font-bold">4</p>
              </div>
              <Verified className="w-10 h-10 text-secondary/30" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium mb-1">Active</p>
                <p className="text-3xl font-bold text-primary">2</p>
              </div>
              <CheckCircle className="w-10 h-10 text-primary/30" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium mb-1">Expiring Soon</p>
                <p className="text-3xl font-bold text-accent">1</p>
              </div>
              <Clock className="w-10 h-10 text-accent/30" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-sm font-medium mb-1">Expired</p>
                <p className="text-3xl font-bold text-secondary">1</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-secondary/30" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by domain or issuer..."
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="btn-ghost">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Certificates List */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-card/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Domain</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Issuer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Issued</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Expires</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Days Left</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{cert.domain}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted text-sm">{cert.issuer}</span>
                    </td>
                    <td className="px-6 py-4">
                      {cert.status === 'active' && (
                        <span className="badge-success">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      )}
                      {cert.status === 'expiring' && (
                        <span className="badge-warning">
                          <Clock className="w-3 h-3" />
                          Expiring Soon
                        </span>
                      )}
                      {cert.status === 'expired' && (
                        <span className="badge">
                          <AlertTriangle className="w-3 h-3" />
                          Expired
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted text-sm">{cert.issuedDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted text-sm">{cert.expiryDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold text-sm ${
                        cert.status === 'active' ? 'text-primary' : 
                        cert.status === 'expiring' ? 'text-accent' : 
                        'text-secondary'
                      }`}>
                        {cert.daysLeft > 0 ? `${cert.daysLeft}d` : 'Expired'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-border rounded-lg transition-colors text-muted hover:text-foreground" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-border rounded-lg transition-colors text-muted hover:text-foreground" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-border rounded-lg transition-colors text-muted hover:text-secondary" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <p className="text-muted text-sm">
            💡 <strong>Tip:</strong> Certificates expiring within 30 days are marked as &quot;Expiring Soon&quot;. We recommend renewing them at least 15 days before expiration.
          </p>
        </div>
      </main>
    </div>
  );
}
