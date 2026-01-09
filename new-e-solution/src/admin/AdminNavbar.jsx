
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetNavbarQuery,
  useSaveNavbarMutation,
} from "../redux/apis/navbarApi";

const emptyButton = {
  label: "",
  section: "",
  isPrimary: false,
  isActive: true,
  order: 1,
};

export default function AdminNavbar() {
  /* ================= API ================= */
  const { data, isLoading: loadingNavbar } = useGetNavbarQuery();
  const [saveNavbar, { isLoading: saving }] = useSaveNavbarMutation();

  /* ================= STATE ================= */
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [buttons, setButtons] = useState([]);

  /* ================= LOAD FROM DB ================= */
  useEffect(() => {
    if (data) {
      setBrandName(data.brandName || "");
      setTagline(data.tagline || "");

      setButtons(
        Array.isArray(data.buttons)
          ? data.buttons
              .slice()
              .sort((a, b) => a.order - b.order)
          : []
      );
    }
  }, [data]);

  /* ================= HELPERS ================= */

  const addButton = () => {
    setButtons([
      ...buttons,
      { ...emptyButton, order: buttons.length + 1 },
    ]);
  };

  const updateButton = (i, key, value) => {
    const copy = [...buttons];
    copy[i] = { ...copy[i], [key]: value };
    setButtons(copy);
  };

  const deleteButton = (i) => {
    const copy = [...buttons];
    copy.splice(i, 1);
    setButtons(copy.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  const toggleActive = (i) => {
    updateButton(i, "isActive", !buttons[i].isActive);
  };

  const togglePrimary = (i) => {
    setButtons(
      buttons.map((b, idx) => ({
        ...b,
        isPrimary: idx === i,
      }))
    );
  };

  const move = (i, dir) => {
    const copy = [...buttons];
    const target = i + dir;
    if (target < 0 || target >= copy.length) return;

    [copy[i], copy[target]] = [copy[target], copy[i]];
    setButtons(copy.map((b, idx) => ({ ...b, order: idx + 1 })));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      await saveNavbar({
        brandName,
        tagline,
        buttons,
      }).unwrap();

      toast.success("Navbar saved successfully ✅");
    } catch {
      toast.error("Failed to save navbar ❌");
    }
  };

  /* ================= LOADING ================= */
  if (loadingNavbar) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading navbar...
      </p>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold">Navbar Settings</h2>

      {/* BRAND */}
      <div className="space-y-3">
        <input
          className="w-full border p-3 rounded"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Brand Name"
        />

        <input
          className="w-full border p-3 rounded"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Tagline"
        />
      </div>

      {/* BUTTONS */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Menu Buttons</h3>
          <button
            onClick={addButton}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            + Add Button
          </button>
        </div>

        {buttons.map((btn, i) => (
          <div key={i} className="border rounded p-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="border p-2 rounded"
                placeholder="Label (e.g. Home)"
                value={btn.label}
                onChange={(e) =>
                  updateButton(i, "label", e.target.value)
                }
              />

              <input
                className="border p-2 rounded"
                placeholder="Section / Path (e.g. home)"
                value={btn.section}
                onChange={(e) =>
                  updateButton(i, "section", e.target.value)
                }
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleActive(i)}
                className={`px-3 py-1 rounded ${
                  btn.isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-300"
                }`}
              >
                {btn.isActive ? "Active" : "Inactive"}
              </button>

              <button
                onClick={() => togglePrimary(i)}
                className={`px-3 py-1 rounded ${
                  btn.isPrimary
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Primary
              </button>

              <button
                onClick={() => move(i, -1)}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                ↑
              </button>

              <button
                onClick={() => move(i, 1)}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                ↓
              </button>

              <button
                onClick={() => deleteButton(i)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-6 py-3 rounded w-full text-lg"
      >
        {saving ? "Saving..." : "Save Navbar"}
      </button>
    </div>
  );
}

