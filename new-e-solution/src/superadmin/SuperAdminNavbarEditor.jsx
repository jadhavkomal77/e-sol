
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import {
  useGetSuperNavbarQuery,
  useSaveSuperNavbarMutation,
} from "../redux/apis/superAdminNavbarApi";

const createButton = (order) => ({
  _id: nanoid(),              // ✅ stable id
  label: "",
  type: "section",
  section: "",
  path: "",
  isPrimary: false,
  isActive: true,
  order,
});

export default function SuperAdminNavbarEditor() {
  const { data, isLoading } = useGetSuperNavbarQuery();
  const [saveNavbar, { isLoading: saving }] = useSaveSuperNavbarMutation();

  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [buttons, setButtons] = useState([]);

  // 🆕 snapshot of last saved navbar
  const [savedNavbar, setSavedNavbar] = useState(null);

  /* ===== LOAD FROM API (ONCE / AFTER SAVE) ===== */
  useEffect(() => {
    if (data?.navbar) {
      const navbar = data.navbar;

      const normalizedButtons = (navbar.buttons || [])
        .map((b, i) => ({
          ...b,
          _id: b._id || nanoid(),   // ✅ ensure id
          order: i + 1,
        }))
        .sort((a, b) => a.order - b.order);

      const snapshot = {
        brandName: navbar.brandName || "",
        tagline: navbar.tagline || "",
        buttons: normalizedButtons,
      };

      setBrandName(snapshot.brandName);
      setTagline(snapshot.tagline);
      setButtons(snapshot.buttons);

      setSavedNavbar(snapshot); // ✅ reset base
    }
  }, [data]);

  /* ===== BUTTON OPS ===== */

  const addButton = () =>
    setButtons((prev) => [
      ...prev,
      createButton(prev.length + 1),
    ]);

  const updateButton = (id, key, value) => {
    setButtons((prev) =>
      prev.map((btn) =>
        btn._id === id
          ? {
              ...btn,
              [key]: value,
              ...(key === "type"
                ? value === "section"
                  ? { path: "" }
                  : { section: "" }
                : {}),
            }
          : btn
      )
    );
  };

  const deleteButton = (id) =>
    setButtons((prev) =>
      prev
        .filter((b) => b._id !== id)
        .map((b, i) => ({ ...b, order: i + 1 }))
    );

  const moveButton = (id, dir) => {
    setButtons((prev) => {
      const index = prev.findIndex((b) => b._id === id);
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;

      const reordered = [...prev];
      [reordered[index], reordered[target]] =
        [reordered[target], reordered[index]];

      return reordered.map((b, i) => ({ ...b, order: i + 1 }));
    });
  };

  const toggleActive = (id) =>
    updateButton(id, "isActive", !buttons.find(b => b._id === id)?.isActive);

  const setPrimary = (id) =>
    setButtons((prev) =>
      prev.map((b) => ({
        ...b,
        isPrimary: b._id === id,
      }))
    );

  /* ===== SAVE ===== */
  const handleSave = async () => {
    try {
      const payload = { brandName, tagline, buttons };
      await saveNavbar(payload).unwrap();

      setSavedNavbar(payload); // ✅ update snapshot
      toast.success("Navbar saved successfully ✅");
    } catch {
      toast.error("Failed to save navbar ❌");
    }
  };

  /* ===== RESET ===== */
  const handleReset = () => {
    if (!savedNavbar) return;

    setBrandName(savedNavbar.brandName);
    setTagline(savedNavbar.tagline);
    setButtons(savedNavbar.buttons);
    toast.info("Reverted to last saved version 🔄");
  };

  if (isLoading)
    return <p className="text-center py-10">Loading Navbar…</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        MVAD IT Solutions – Navbar Editor
      </h1>

      {/* BRAND */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="border p-3 rounded"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Brand Name"
        />
        <input
          className="border p-3 rounded"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Tagline"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Menu Buttons</h2>
        <button
          onClick={addButton}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Button
        </button>
      </div>

      {/* BUTTON LIST */}
      <div className="space-y-4">
        {buttons.map((btn) => (
          <div key={btn._id} className="p-4 bg-gray-50 border rounded-lg space-y-3">
            <input
              className="border p-2 rounded w-full"
              value={btn.label}
              placeholder="Label"
              onChange={(e) =>
                updateButton(btn._id, "label", e.target.value)
              }
            />

            <select
              className="border p-2 rounded w-full"
              value={btn.type}
              onChange={(e) =>
                updateButton(btn._id, "type", e.target.value)
              }
            >
              <option value="section">Scroll to Section</option>
              <option value="path">Navigate to Page</option>
            </select>

            {btn.type === "section" ? (
              <input
                className="border p-2 rounded w-full"
                placeholder="Section ID"
                value={btn.section}
                onChange={(e) =>
                  updateButton(btn._id, "section", e.target.value)
                }
              />
            ) : (
              <input
                className="border p-2 rounded w-full"
                placeholder="Path"
                value={btn.path}
                onChange={(e) =>
                  updateButton(btn._id, "path", e.target.value)
                }
              />
            )}

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => toggleActive(btn._id)}>
                {btn.isActive ? "Active" : "Inactive"}
              </button>
              <button onClick={() => setPrimary(btn._id)}>Primary</button>
              <button onClick={() => moveButton(btn._id, -1)}>↑</button>
              <button onClick={() => moveButton(btn._id, 1)}>↓</button>
              <button
                className="text-red-600"
                onClick={() => deleteButton(btn._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          className="w-1/2 bg-gray-600 text-white py-3 rounded-lg"
          onClick={handleReset}
        >
          Reset Changes
        </button>
        <button
          className="w-1/2 bg-blue-600 text-white py-3 rounded-lg"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Navbar"}
        </button>
      </div>
    </div>
  );
}


