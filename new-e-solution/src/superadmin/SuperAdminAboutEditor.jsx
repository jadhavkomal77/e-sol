import { useEffect, useState } from "react";
import {
  useGetSuperAboutPrivateQuery,
  useSaveSuperAboutMutation,
  useDeleteSuperAboutMutation,
} from "../redux/apis/superAdminAboutApi";
import { toast } from "react-toastify";

export default function SuperAdminAboutEditor() {
  const { data, isLoading, refetch } = useGetSuperAboutPrivateQuery();
  const [saveAbout, { isLoading: saving }] = useSaveSuperAboutMutation();
  const [deleteAbout, { isLoading: deleting }] = useDeleteSuperAboutMutation();

  const defaultState = {
    title: "",
    subtitle: "",
    description: "",
    image: "",
    features: [{ text: "" }],
  };

  const [about, setAbout] = useState(defaultState);

  useEffect(() => {
    if (data?.about) setAbout(data.about);
  }, [data]);

  const handleChange = (key, value) => {
    setAbout((prev) => ({ ...prev, [key]: value }));
  };

  const updateFeature = (index, value) => {
    setAbout((prev) => {
      const features = [...prev.features];
      features[index].text = value;
      return { ...prev, features };
    });
  };

  const addFeature = () =>
    setAbout((prev) => ({
      ...prev,
      features: [...prev.features, { text: "" }],
    }));

  const removeFeature = (index) =>
    setAbout((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));

  const resetForm = () => setAbout(defaultState);

  const handleSubmit = async () => {
    if (!about.title.trim()) return toast.error("Title is required!");

    try {
      await saveAbout(about).unwrap();
      toast.success("About updated 🎯");
      refetch();
      document.getElementById("preview-section")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      toast.error("Update Failed ❌");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await deleteAbout().unwrap();
      toast.success("About removed 🗑️");
      resetForm();
    } catch {
      toast.error("Failed ❌");
    }
  };

  if (isLoading) {
    return <p className="text-white text-center py-10">Loading About Data...</p>;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-6">
      
      {/* FORM AREA */}
      <div className="bg-white/20 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-black mb-4">Manage About Section</h2>

        <input
          className="input w-full my-2"
          placeholder="Title"
          value={about.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          className="input w-full my-2"
          placeholder="Subtitle"
          value={about.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
        />
        <textarea
          className="input w-full my-2 min-h-[120px]"
          placeholder="Description"
          value={about.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <input
          className="input w-full my-2"
          placeholder="Image URL"
          value={about.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />

        {/* FEATURES */}
        <h3 className="text-black font-medium mt-4">Key Features</h3>
        {about.features?.map((item, index) => (
          <div key={index} className="flex gap-2 my-2">
            <input
              className="input w-full"
              placeholder="Feature Point"
              value={item.text}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            <button
              onClick={() => removeFeature(index)}
              className="bg-red-500 px-3 rounded-lg text-white"
            >
              ✕
            </button>
          </div>
        ))}

        <button className="btn bg-blue-500 text-white mt-2" onClick={addFeature}>
          + Add Feature
        </button>

        <div className="flex flex-col mt-6 gap-3">
          <button
            className="btn bg-green-600 text-white py-2 rounded-xl"
            onClick={handleSubmit}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button className="btn bg-gray-500 text-white py-2 rounded-xl" onClick={resetForm}>
            Reset
          </button>

          {data?.about && (
            <button
              className="btn bg-red-600 text-white py-2 rounded-xl"
              onClick={handleDelete}
            >
              {deleting ? "Deleting..." : "Delete Section"}
            </button>
          )}
        </div>
      </div>

      {/* LIVE PREVIEW */}
      <div
        id="preview-section"
        className="bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-white/20 text-black"
      >
        <h3 className="text-2xl font-bold">{about.title || "Live About Preview"}</h3>
        {about.subtitle && <p className="text-blue-500">{about.subtitle}</p>}
        {about.description && <p className="text-black mt-4">{about.description}</p>}

        {about.image && (
          <img
            src={about.image}
            alt="About"
            className="rounded-lg w-full h-52 object-cover mt-4"
          />
        )}

        <ul className="mt-4 space-y-2">
          {about.features?.length > 0 ? (
            about.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                ⭐ {f.text}
              </li>
            ))
          ) : (
            <p className="text-gray-400 italic">No feature points added</p>
          )}
        </ul>
      </div>
    </div>
  );
}
