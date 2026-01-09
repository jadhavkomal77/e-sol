
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Save, Plus, Trash2 } from "lucide-react";
import {
  useGetSuperAdminHeroPrivateQuery,
  useSaveSuperAdminHeroMutation,
} from "../redux/apis/superAdminHeroApi";

/* Tailwind Input Style */
const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 " +
  "placeholder-[#6B7280] shadow-sm transition-all duration-200 " +
  "focus:border-[#0051FF] focus:ring-4 focus:ring-[#0051FF]/10 focus:outline-none " +
  "hover:border-gray-300";

export default function SuperAdminHeroEditor() {
  const { data, isLoading } = useGetSuperAdminHeroPrivateQuery();
  const [saveHero, { isLoading: saving }] = useSaveSuperAdminHeroMutation();

  const [form, setForm] = useState({
    badgeText: "",
    title: "",
    highlightText: "",
    description: "",
    buttonPrimary: "",
    buttonSecondary: "",
    phone: "",
    email: "",
    location: "",
    stats: [],
  });

  useEffect(() => {
    if (data?.hero) setForm(data.hero);
  }, [data]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateStats = (index, field, value) => {
    const updated = [...form.stats];
    updated[index][field] = value;
    setForm({ ...form, stats: updated });
  };

  const addStat = () =>
    setForm({ ...form, stats: [...form.stats, { value: "", label: "" }] });

  const removeStat = (i) =>
    setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    try {
      await saveHero(form).unwrap();
      toast.success("Hero Section Updated Successfully 🎯", {
        style: { background: "#0051FF", color: "#fff" },
      });
    } catch {
      toast.error("Update Failed ❌");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse text-[#6B7280]">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-100">
      {/* HEADER */}
      <div className="mb-10 pb-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hero Section Editor
        </h1>
        <p className="text-[#6B7280] font-medium">
          Customize the main hero section displayed on your website
        </p>
      </div>

      {/* HERO CONTENT */}
      <Section title="Hero Content">
        <Grid>
          <Input
            label="Badge Text"
            name="badgeText"
            value={form.badgeText}
            onChange={handleChange}
            placeholder="e.g., Trusted by 1000+ Companies"
          />
          <Input
            label="Main Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Transform Your Business"
          />
          <Input
            label="Highlighted Text"
            name="highlightText"
            value={form.highlightText}
            onChange={handleChange}
            placeholder="Text to highlight in gradient"
          />
        </Grid>

        <Textarea
          label="Hero Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Compelling description of your services..."
        />
      </Section>

      {/* CTA BUTTONS */}
      <Section title="Call To Action Buttons">
        <Grid>
          <Input
            label="Primary Button Text"
            name="buttonPrimary"
            value={form.buttonPrimary}
            onChange={handleChange}
            placeholder="e.g., Get Started"
          />
          <Input
            label="Secondary Button Text"
            name="buttonSecondary"
            value={form.buttonSecondary}
            onChange={handleChange}
            placeholder="e.g., Learn More"
          />
        </Grid>
      </Section>

      {/* CONTACT INFO */}
      <Section title="Contact Details">
        <Grid cols="md:grid-cols-3">
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contact@example.com"
          />
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="New York, USA"
          />
        </Grid>
      </Section>

      {/* HERO STATS */}
      <Section title="Statistics Cards">
        <div className="space-y-3">
          {form.stats.map((stat, i) => (
            <div
              key={i}
              className="flex gap-3 items-start p-4 rounded-2xl bg-[#F1F5F9] border border-gray-200"
            >
              <div className="flex-1 grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  placeholder="Value (e.g., 1000+)"
                  value={stat.value}
                  onChange={(e) => updateStats(i, "value", e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Label (e.g., Happy Clients)"
                  value={stat.label}
                  onChange={(e) => updateStats(i, "label", e.target.value)}
                />
              </div>
              <button
                onClick={() => removeStat(i)}
                className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Remove statistic"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addStat}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-[#0051FF] font-semibold hover:bg-[#0051FF]/10 rounded-xl transition-colors"
        >
          <Plus size={18} />
          Add Statistic
        </button>
      </Section>

      {/* ACTIONS */}
      <div className="flex gap-4 pt-8 mt-10 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0051FF] font-semibold text-white hover:bg-[#0045E0] shadow-lg shadow-[#0051FF]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* UI Components */
function Section({ title, children }) {
  return (
    <section className="mb-10 rounded-2xl border border-gray-200 bg-[#F1F5F9]/50 p-6 lg:p-8">
      <h2 className="mb-6 text-xl font-bold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children, cols = "md:grid-cols-2" }) {
  return <div className={`grid grid-cols-1 ${cols} gap-4 lg:gap-6`}>{children}</div>;
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input {...props} className={inputClass} />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <textarea
        {...props}
        className={`${inputClass} min-h-[120px] resize-none`}
      />
    </div>
  );
}