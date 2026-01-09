
// admin/AdminAbout.jsx
import { useEffect, useState } from "react";
import {
  useGetAboutPageQuery,
  useUpdateAboutPageMutation,
} from "../redux/apis/aboutApi";
import { toast } from "react-toastify";

const emptyFeature = { icon: "", title: "", description: "" };

export default function AdminAbout() {
  /* ===== API ===== */
  const { data, isLoading } = useGetAboutPageQuery(); // admin token based
  const [updateAbout, { isLoading: saving }] =
    useUpdateAboutPageMutation();

  /* ===== STATE ===== */
  const [form, setForm] = useState({
    mainTitle: "",
    mainDescription: "",
    features: [],
    whyChoose: [],
    stats: {
      year: "",
      projects: "",
      satisfaction: "",
      coverage: "",
    },
  });

  /* ===== LOAD EXISTING DATA (NO DELETE) ===== */
  useEffect(() => {
    if (data) {
      setForm({
        mainTitle: data.mainTitle || "",
        mainDescription: data.mainDescription || "",
        features: Array.isArray(data.features) ? data.features : [],
        whyChoose: Array.isArray(data.whyChoose) ? data.whyChoose : [],
        stats: {
          year: data.stats?.year || "",
          projects: data.stats?.projects || "",
          satisfaction: data.stats?.satisfaction || "",
          coverage: data.stats?.coverage || "",
        },
      });
    }
  }, [data]);

  /* ===== HELPERS ===== */
  const addItem = (key) =>
    setForm({
      ...form,
      [key]: [...form[key], emptyFeature],
    });

  const updateItem = (key, index, field, value) => {
    const clone = [...form[key]];
    clone[index] = { ...clone[index], [field]: value };
    setForm({ ...form, [key]: clone });
  };

  const removeItem = (key, index) => {
    const clone = [...form[key]];
    clone.splice(index, 1);
    setForm({ ...form, [key]: clone });
  };

  /* ===== SAVE (UPDATE ONLY) ===== */
  const saveAbout = async () => {
    try {
      await updateAbout(form).unwrap();
      toast.success("About page updated successfully ✅");
    } catch (err) {
      toast.error("Failed to update About page ❌");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">About Page Settings</h1>

      {/* ================= MAIN ================= */}
      <div className="space-y-4">
        <input
          className="border p-3 w-full rounded"
          placeholder="Main Title"
          value={form.mainTitle}
          onChange={(e) =>
            setForm({ ...form, mainTitle: e.target.value })
          }
        />

        <textarea
          className="border p-3 w-full rounded"
          rows={4}
          placeholder="Main Description"
          value={form.mainDescription}
          onChange={(e) =>
            setForm({ ...form, mainDescription: e.target.value })
          }
        />
      </div>

      {/* ================= FEATURES & WHY CHOOSE ================= */}
      {["features", "whyChoose"].map((section) => (
        <div key={section} className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">
              {section}
            </h2>
            <button
              onClick={() => addItem(section)}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              + Add
            </button>
          </div>

          {form[section].map((item, i) => (
            <div
              key={i}
              className="border p-4 rounded space-y-3"
            >
              <input
                className="border p-2 w-full rounded"
                placeholder="Icon (e.g. Shield)"
                value={item.icon}
                onChange={(e) =>
                  updateItem(section, i, "icon", e.target.value)
                }
              />

              <input
                className="border p-2 w-full rounded"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  updateItem(section, i, "title", e.target.value)
                }
              />

              <textarea
                className="border p-2 w-full rounded"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  updateItem(section, i, "description", e.target.value)
                }
              />

              <button
                onClick={() => removeItem(section, i)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* ================= STATS ================= */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Stats</h2>

        {["year", "projects", "satisfaction", "coverage"].map(
          (key) => (
            <input
              key={key}
              className="border p-2 w-full rounded"
              placeholder={key.toUpperCase()}
              value={form.stats[key]}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: {
                    ...form.stats,
                    [key]: e.target.value,
                  },
                })
              }
            />
          )
        )}
      </div>

      {/* ================= SAVE ================= */}
      <button
        onClick={saveAbout}
        disabled={saving}
        className="bg-blue-600 text-white w-full py-3 rounded text-lg"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
