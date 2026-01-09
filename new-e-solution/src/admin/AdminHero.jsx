


import { useEffect, useState } from "react";
import {
  useGetAdminHeroQuery,
  useSaveHeroMutation,
  useDeleteHeroMutation,
} from "../redux/apis/heroApi";
import { toast } from "react-toastify";

/* ======================
   TAILWIND INPUT STYLE
====================== */
const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 " +
  "placeholder-gray-400 shadow-sm transition-all " +
  "focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none";

export default function AdminHero() {
  const { data, isLoading } = useGetAdminHeroQuery();
  const [saveHero, { isLoading: saving }] = useSaveHeroMutation();
  const [deleteHero, { isLoading: deleting }] = useDeleteHeroMutation();

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
  if (data?.hero) {
    setForm({
      badgeText: data.hero.badgeText || "",
      title: data.hero.title || "",
      highlightText: data.hero.highlightText || "",
      description: data.hero.description || "",
      buttonPrimary: data.hero.buttonPrimary || "",
      buttonSecondary: data.hero.buttonSecondary || "",
      phone: data.hero.phone || "",
      email: data.hero.email || "",
      location: data.hero.location || "",
      stats: Array.isArray(data.hero.stats) ? data.hero.stats : [],
    });
  }
}, [data]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleStatChange = (i, field, value) => {
    const stats = [...form.stats];
    stats[i][field] = value;
    setForm({ ...form, stats });
  };

  const addStat = () =>
    setForm({ ...form, stats: [...form.stats, { value: "", label: "" }] });

  const removeStat = (i) =>
    setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) });

  const handleSave = async () => {
    try {
      await saveHero(form).unwrap();
      toast.success("Hero saved successfully ✅");
    } catch {
      toast.error("Failed to save hero");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete Hero section permanently?")) return;
    try {
      await deleteHero().unwrap();
      toast.success("Hero deleted successfully 🗑️");
      setForm({
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
    } catch {
      toast.error("Failed to delete hero");
    }
  };

  if (isLoading) {
    return <div className="p-6 text-gray-600">Loading Hero Settings...</div>;
  }

  return (
    <div className="max-w-6xl bg-white p-10 rounded-3xl shadow-2xl">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Hero Section Settings
        </h1>
        <p className="text-gray-600 mt-2">
          Manage the main hero section shown on your website homepage
        </p>
      </div>

      {/* HERO CONTENT */}
      <Section title="Hero Content">
        <Grid>
          <Input label="Badge Text" name="badgeText" value={form.badgeText} onChange={handleChange} />
          <Input label="Main Title" name="title" value={form.title} onChange={handleChange} />
          <Input label="Highlighted Text" name="highlightText" value={form.highlightText} onChange={handleChange} />
        </Grid>

        <Textarea
          label="Hero Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </Section>

      {/* BUTTON TEXT */}
      <Section title="Call To Action Buttons">
        <Grid>
          <Input label="Primary Button Text" name="buttonPrimary" value={form.buttonPrimary} onChange={handleChange} />
          <Input label="Secondary Button Text" name="buttonSecondary" value={form.buttonSecondary} onChange={handleChange} />
        </Grid>
      </Section>

      {/* CONTACT */}
      <Section title="Contact Information">
        <Grid cols="md:grid-cols-3">
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Email Address" name="email" value={form.email} onChange={handleChange} />
          <Input label="Business Location" name="location" value={form.location} onChange={handleChange} />
        </Grid>
      </Section>

      {/* STATS */}
      <Section title="Hero Statistics">
{Array.isArray(form.stats) &&
  form.stats.map((stat, i) => (
          <div key={i} className="flex gap-3 items-center mb-3">
            <input
              className={inputClass}
              placeholder="Value (15+)"
              value={stat.value}
              onChange={(e) => handleStatChange(i, "value", e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Label (Years Experience)"
              value={stat.label}
              onChange={(e) => handleStatChange(i, "label", e.target.value)}
            />
            <button
              onClick={() => removeStat(i)}
              className="text-red-600 text-xl font-bold hover:scale-110"
            >
              ×
            </button>
          </div>
        ))}

        <button
          onClick={addStat}
          className="mt-2 text-blue-600 font-semibold hover:underline"
        >
          + Add Statistic
        </button>
      </Section>

      {/* ACTION BUTTONS */}
      <div className="flex gap-6 pt-8 border-t mt-10">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-10 py-3 font-semibold text-white shadow-lg
                     transition-all hover:bg-blue-700 active:scale-95"
        >
          {saving ? "Saving..." : "Save Hero"}
        </button>

        {data && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl bg-red-600 px-10 py-3 font-semibold text-white shadow-lg
                       transition-all hover:bg-red-700 active:scale-95"
          >
            {deleting ? "Deleting..." : "Delete Hero"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ======================
   REUSABLE UI
====================== */

function Section({ title, children }) {
  return (
    <section className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children, cols = "md:grid-cols-2" }) {
  return <div className={`grid grid-cols-1 ${cols} gap-4`}>{children}</div>;
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input {...props} className={inputClass} />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1 mt-4">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <textarea {...props} className={`${inputClass} min-h-[120px] resize-none`} />
    </div>
  );
}
