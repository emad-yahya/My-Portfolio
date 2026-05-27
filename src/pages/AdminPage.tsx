import { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DEFAULT_DATA, type PortfolioData, type Service, type Project, type SkillGroup } from '../lib/portfolioData';

// ── Shared UI ──────────────────────────────────────────────────────────────────

const inp = 'w-full rounded-xl border border-[#2a2a35] bg-[#1a1a22] px-3.5 py-2.5 text-sm text-[#D7E2EA] outline-none focus:border-[#D7E2EA]/40 transition-colors placeholder-[#D7E2EA]/20 resize-none';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">{label}</span>
    {children}
  </div>
);

const Divider = () => <div className="border-t border-[#1e1e26]" />;

// ── Image Field ────────────────────────────────────────────────────────────────

const ImageField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Field label={label}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/projects/name/cover.png"
          className={`${inp} flex-1 font-mono text-xs`}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="shrink-0 rounded-xl border border-[#2a2a35] bg-[#1a1a22] px-3 text-xs text-[#D7E2EA]/50 hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/80 transition-colors"
        >
          Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {value && (
        <img
          src={value}
          alt=""
          className="mt-1 h-12 w-20 rounded-lg object-cover border border-[#2a2a35] opacity-80"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
    </Field>
  );
};

// ── Login ──────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'emad2026';

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setErr(true);
      setPw('');
      setTimeout(() => setErr(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/30">
          Portfolio
        </p>
        <h1 className="mb-8 text-3xl font-black uppercase tracking-tight text-[#D7E2EA]">
          Admin Panel
        </h1>
        <div className="flex flex-col gap-4">
          <Field label="Password">
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
              className={`${inp} ${err ? 'border-red-500/60' : ''}`}
              placeholder="Enter password"
            />
            {err && <span className="text-xs text-red-400">Wrong password</span>}
          </Field>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-white py-3 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-[#D7E2EA] transition-colors"
          >
            Enter
          </button>
        </div>
        <p className="mt-6 text-center text-[10px] text-[#D7E2EA]/20">
          <a href="#" className="hover:text-[#D7E2EA]/50 transition-colors">← Back to portfolio</a>
        </p>
      </form>
    </div>
  );
};

// ── About Editor ───────────────────────────────────────────────────────────────

const AboutEditor = ({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) => {
  const updateText = (text: string) =>
    setDraft({ ...draft, about: { ...draft.about, text } });

  const updateGroup = (i: number, patch: Partial<SkillGroup>) => {
    const skills = draft.about.skills.map((g, idx) => (idx === i ? { ...g, ...patch } : g));
    setDraft({ ...draft, about: { ...draft.about, skills } });
  };

  const removeGroup = (i: number) => {
    const skills = draft.about.skills.filter((_, idx) => idx !== i);
    setDraft({ ...draft, about: { ...draft.about, skills } });
  };

  const addGroup = () => {
    const skills = [...draft.about.skills, { label: 'New Group', items: [] }];
    setDraft({ ...draft, about: { ...draft.about, skills } });
  };

  return (
    <div className="flex flex-col gap-6">
      <Field label="Bio Text">
        <textarea
          value={draft.about.text}
          onChange={(e) => updateText(e.target.value)}
          rows={5}
          className={inp}
        />
      </Field>

      <Divider />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
            Skill Groups
          </span>
          <button
            type="button"
            onClick={addGroup}
            className="rounded-full border border-dashed border-[#D7E2EA]/20 px-3 py-1 text-[10px] text-[#D7E2EA]/40 hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA]/60 transition-colors"
          >
            + Add Group
          </button>
        </div>

        {draft.about.skills.map((group, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#2a2a35] bg-[#141418] p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={group.label}
                onChange={(e) => updateGroup(i, { label: e.target.value })}
                className={`${inp} flex-1`}
                placeholder="Group name"
              />
              <button
                type="button"
                onClick={() => removeGroup(i)}
                className="shrink-0 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400/70 hover:bg-red-500/10 hover:border-red-500/40 transition-colors"
              >
                Remove
              </button>
            </div>
            <Field label="Items (comma-separated)">
              <input
                type="text"
                value={group.items.join(', ')}
                onChange={(e) =>
                  updateGroup(i, {
                    items: e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                className={inp}
                placeholder="Item 1, Item 2, Item 3"
              />
            </Field>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#D7E2EA]/10 px-2.5 py-0.5 text-xs text-[#D7E2EA]/50"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Services Editor ────────────────────────────────────────────────────────────

const ServicesEditor = ({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) => {
  const update = (i: number, patch: Partial<Service>) => {
    const services = draft.services.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    setDraft({ ...draft, services });
  };

  const remove = (i: number) =>
    setDraft({ ...draft, services: draft.services.filter((_, idx) => idx !== i) });

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...draft.services];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setDraft({ ...draft, services: arr });
  };

  const add = () =>
    setDraft({
      ...draft,
      services: [...draft.services, { number: '', title: '', description: '' }],
    });

  return (
    <div className="flex flex-col gap-4">
      {draft.services.map((svc, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#2a2a35] bg-[#141418] p-4 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#D7E2EA]/20 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded px-2 py-1 text-sm text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 disabled:opacity-30 transition-colors"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === draft.services.length - 1}
                className="rounded px-2 py-1 text-sm text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 disabled:opacity-30 transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400/70 hover:bg-red-500/10 hover:border-red-500/40 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          <Field label="Title">
            <input
              type="text"
              value={svc.title}
              onChange={(e) => update(i, { title: e.target.value })}
              className={inp}
            />
          </Field>
          <Field label="Description">
            <textarea
              value={svc.description}
              onChange={(e) => update(i, { description: e.target.value })}
              rows={3}
              className={inp}
            />
          </Field>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#D7E2EA]/15 py-4 text-xs text-[#D7E2EA]/30 hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/60 transition-colors"
      >
        + Add Service
      </button>
    </div>
  );
};

// ── Projects Editor ────────────────────────────────────────────────────────────

const ProjectsEditor = ({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) => {
  const update = (i: number, patch: Partial<Project>) => {
    const projects = draft.projects.map((p, idx) => (idx === i ? { ...p, ...patch } : p));
    setDraft({ ...draft, projects });
  };

  const remove = (i: number) =>
    setDraft({ ...draft, projects: draft.projects.filter((_, idx) => idx !== i) });

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...draft.projects];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setDraft({ ...draft, projects: arr });
  };

  const add = () =>
    setDraft({
      ...draft,
      projects: [
        ...draft.projects,
        { number: '', category: '', name: '', liveUrl: '', col1Image1: '', col1Image2: '', col2Image: '' },
      ],
    });

  return (
    <div className="flex flex-col gap-4">
      {draft.projects.map((proj, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#2a2a35] bg-[#141418] p-4 flex flex-col gap-4"
        >
          {/* Header row */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[#D7E2EA]/20 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-medium text-[#D7E2EA]/60 truncate">{proj.name || 'Untitled'}</span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded px-2 py-1 text-sm text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 disabled:opacity-30 transition-colors"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === draft.projects.length - 1}
                className="rounded px-2 py-1 text-sm text-[#D7E2EA]/25 hover:text-[#D7E2EA]/70 disabled:opacity-30 transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400/70 hover:bg-red-500/10 hover:border-red-500/40 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Name + Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name">
              <input
                type="text"
                value={proj.name}
                onChange={(e) => update(i, { name: e.target.value })}
                className={inp}
                placeholder="Project Name"
              />
            </Field>
            <Field label="Category">
              <input
                type="text"
                value={proj.category}
                onChange={(e) => update(i, { category: e.target.value })}
                className={inp}
                placeholder="Web · Dev"
              />
            </Field>
          </div>

          <Field label="Live URL">
            <input
              type="text"
              value={proj.liveUrl}
              onChange={(e) => update(i, { liveUrl: e.target.value })}
              className={inp}
              placeholder="https://"
            />
          </Field>

          <Divider />

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ImageField
              label="Left Top Image"
              value={proj.col1Image1}
              onChange={(v) => update(i, { col1Image1: v })}
            />
            <ImageField
              label="Left Bottom Image"
              value={proj.col1Image2}
              onChange={(v) => update(i, { col1Image2: v })}
            />
            <ImageField
              label="Right Image"
              value={proj.col2Image}
              onChange={(v) => update(i, { col2Image: v })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#D7E2EA]/15 py-4 text-xs text-[#D7E2EA]/30 hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/60 transition-colors"
      >
        + Add Project
      </button>
    </div>
  );
};

// ── Contact Editor ─────────────────────────────────────────────────────────────

const ContactEditor = ({
  draft,
  setDraft,
}: {
  draft: PortfolioData;
  setDraft: (d: PortfolioData) => void;
}) => {
  const update = (patch: Partial<typeof draft.contact>) =>
    setDraft({ ...draft, contact: { ...draft.contact, ...patch } });

  return (
    <div className="flex flex-col gap-6">
      <Field label="Email">
        <input
          type="email"
          value={draft.contact.email}
          onChange={(e) => update({ email: e.target.value })}
          className={inp}
        />
      </Field>

      <Divider />

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
          WhatsApp
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Number for link (no + or spaces)">
            <input
              type="text"
              value={draft.contact.whatsapp}
              onChange={(e) => update({ whatsapp: e.target.value })}
              className={inp}
              placeholder="971566392647"
            />
          </Field>
          <Field label="Display text">
            <input
              type="text"
              value={draft.contact.whatsappDisplay}
              onChange={(e) => update({ whatsappDisplay: e.target.value })}
              className={inp}
              placeholder="+971 566 392 647"
            />
          </Field>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
          LinkedIn
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full URL">
            <input
              type="text"
              value={draft.contact.linkedin}
              onChange={(e) => update({ linkedin: e.target.value })}
              className={inp}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>
          <Field label="Display text">
            <input
              type="text"
              value={draft.contact.linkedinDisplay}
              onChange={(e) => update({ linkedinDisplay: e.target.value })}
              className={inp}
              placeholder="in/your-name"
            />
          </Field>
        </div>
      </div>

      <Divider />

      <Field label="Location">
        <input
          type="text"
          value={draft.contact.location}
          onChange={(e) => update({ location: e.target.value })}
          className={inp}
          placeholder="Dubai, UAE"
        />
      </Field>

      <Divider />

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
          Footer
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Copyright line">
            <input
              type="text"
              value={draft.contact.copyright}
              onChange={(e) => update({ copyright: e.target.value })}
              className={inp}
              placeholder="© 2026 Your Name"
            />
          </Field>
          <Field label="Built in">
            <input
              type="text"
              value={draft.contact.builtIn}
              onChange={(e) => update({ builtIn: e.target.value })}
              className={inp}
              placeholder="Built in Dubai, UAE"
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

// ── Main AdminPage ─────────────────────────────────────────────────────────────

type Tab = 'about' | 'services' | 'projects' | 'contact';

const TABS: { id: Tab; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const AdminPage = () => {
  const [isAuthed, setIsAuthed] = useState(
    () => sessionStorage.getItem('admin_auth') === '1'
  );
  const [tab, setTab] = useState<Tab>('about');
  const [saved, setSaved] = useState(false);
  const { data, updateData } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(() => JSON.parse(JSON.stringify(data)));

  const handleSave = () => {
    const renumbered: PortfolioData = {
      ...draft,
      services: draft.services.map((s, i) => ({
        ...s,
        number: String(i + 1).padStart(2, '0'),
      })),
      projects: draft.projects.map((p, i) => ({
        ...p,
        number: String(i + 1).padStart(2, '0'),
      })),
    };
    updateData(renumbered);
    setDraft(renumbered);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (!confirm('Reset all data to defaults? This cannot be undone.')) return;
    const fresh = JSON.parse(JSON.stringify(DEFAULT_DATA)) as PortfolioData;
    updateData(fresh);
    setDraft(fresh);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return (
      <LoginForm
        onLogin={() => {
          sessionStorage.setItem('admin_auth', '1');
          setIsAuthed(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#D7E2EA]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#1e1e26] bg-[#0a0a0c]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 sm:px-6 py-3.5">
          <span className="font-black text-[10px] tracking-[0.3em] uppercase text-[#D7E2EA]/30">
            Admin
          </span>
          <span className="text-[#2a2a35] text-xs">·</span>
          <span className="font-semibold text-sm text-[#D7E2EA]/70">Emad Yahya</span>

          <div className="ml-auto flex items-center gap-2">
            <a
              href="#"
              className="rounded-full border border-[#2a2a35] px-3.5 py-1.5 text-xs text-[#D7E2EA]/45 hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/80 transition-colors"
            >
              ← Portfolio
            </a>
            <button
              onClick={handleLogout}
              className="rounded-full border border-[#2a2a35] px-3.5 py-1.5 text-xs text-[#D7E2EA]/45 hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/80 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[#1e1e26] bg-[#0a0a0c]">
        <div className="mx-auto flex max-w-5xl px-4 sm:px-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-xs font-medium uppercase tracking-[0.15em] border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-[#D7E2EA] text-[#D7E2EA]'
                  : 'border-transparent text-[#D7E2EA]/30 hover:text-[#D7E2EA]/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 pb-28">
        {tab === 'about' && <AboutEditor draft={draft} setDraft={setDraft} />}
        {tab === 'services' && <ServicesEditor draft={draft} setDraft={setDraft} />}
        {tab === 'projects' && <ProjectsEditor draft={draft} setDraft={setDraft} />}
        {tab === 'contact' && <ContactEditor draft={draft} setDraft={setDraft} />}
      </main>

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1e1e26] bg-[#0a0a0c]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
          <button
            onClick={handleReset}
            className="text-xs text-[#D7E2EA]/20 hover:text-red-400/60 transition-colors"
          >
            Reset to defaults
          </button>
          <button
            onClick={handleSave}
            className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
              saved
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-white text-black hover:bg-[#D7E2EA]'
            }`}
          >
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
