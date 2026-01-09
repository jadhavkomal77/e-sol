

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import {
//   useGetSuperAdminFooterQuery,
//   useUpdateSuperAdminFooterMutation,
// } from "../redux/apis/superAdminFooterApi";
// import { Loader2 } from "lucide-react";

// /* Default footer link */
// const emptyLink = {
//   label: "",
//   url: "",
//   type: "quick", // quick | important
//   isActive: true,
//   order: 1,
// };

// export default function SuperAdminFooterEditor() {
//   const { data, isLoading } = useGetSuperAdminFooterQuery();
//   const [updateFooter, { isLoading: saving }] =
//     useUpdateSuperAdminFooterMutation();

//   const footer = data?.data;

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       brandText: footer?.brandText || "",
//       copyrightText: footer?.copyrightText || "",
//       developedByText: footer?.developedByText || "",
//       showDevelopedBy: footer?.showDevelopedBy ?? true,

//       contact: {
//         phone: footer?.contact?.phone || "",
//         email: footer?.contact?.email || "",
//         address: footer?.contact?.address || "",
//       },

//       socialLinks: {
//         facebook: footer?.socialLinks?.facebook || "",
//         instagram: footer?.socialLinks?.instagram || "",
//         twitter: footer?.socialLinks?.twitter || "",
//         linkedin: footer?.socialLinks?.linkedin || "",
//       },

//       links: Array.isArray(footer?.links)
//         ? [...footer.links].sort((a, b) => a.order - b.order)
//         : [],
//     },

//     validationSchema: Yup.object({
//       brandText: Yup.string().required("Brand text is required"),
//       contact: Yup.object({
//         email: Yup.string().email("Invalid email").required("Email is required"),
//       }),
//     }),

//     // onSubmit: async (values) => {
//     //   try {
//     //     const cleanLinks = values.links
//     //       .filter((l) => l.label.trim() && l.url.trim())
//     //       .map((l, i) => ({ ...l, order: i + 1 }));

//     //     await updateFooter({ ...values, links: cleanLinks }).unwrap();
//     //     toast.success("Footer Updated Successfully 🎯");
//     //   } catch {
//     //     toast.error("Update Failed ❌");
//     //   }
//     // },
//     onSubmit: async (values) => {
//   try {
//     const cleanLinks = values.links
//       .filter((l) => l.label.trim() && l.url.trim())
//       .map((l, i) => ({ ...l, order: i + 1 }));

//     await updateFooter({
//       ...values,
//       brandText: values.brandText.trim(),
//       copyrightText: values.copyrightText.trim(),
//       developedByText: values.developedByText.trim(),
//       links: cleanLinks,
//     }).unwrap();

//     toast.success("Footer Updated Successfully 🎯");
//   } catch {
//     toast.error("Update Failed ❌");
//   }
// }

//   });

//   /* LINK HANDLERS */
//   const addLink = () =>
//     formik.setFieldValue("links", [
//       ...formik.values.links,
//       { ...emptyLink, order: formik.values.links.length + 1 },
//     ]);

//   const updateLink = (i, key, value) =>
//     formik.setFieldValue(
//       "links",
//       formik.values.links.map((l, idx) =>
//         idx === i ? { ...l, [key]: value } : l
//       )
//     );

//   const toggleActive = (i) =>
//     updateLink(i, "isActive", !formik.values.links[i].isActive);

//   const removeLink = (i) =>
//     formik.setFieldValue(
//       "links",
//       formik.values.links
//         .filter((_, idx) => idx !== i)
//         .map((l, idx) => ({ ...l, order: idx + 1 }))
//     );

//   const moveLink = (i, dir) => {
//     const links = [...formik.values.links];
//     const target = i + dir;
//     if (target < 0 || target >= links.length) return;
//     [links[i], links[target]] = [links[target], links[i]];
//     formik.setFieldValue(
//       "links",
//       links.map((l, idx) => ({ ...l, order: idx + 1 }))
//     );
//   };

//   if (isLoading)
//     return (
//       <p className="text-center py-16 text-gray-500">
//         Loading footer settings...
//       </p>
//     );

//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//       <h2 className="text-3xl font-bold mb-8">
//         SuperAdmin Footer Settings
//       </h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-10">

//         {/* BASIC */}
//         <Section title="Basic Details">
//           <Input label="Brand Text" name="brandText" formik={formik} />
//           <Input label="Copyright Text" name="copyrightText" formik={formik} />
//           <Input
//             label="Developed By Text"
//             name="developedByText"
//             formik={formik}
//           />

//           <label className="flex items-center gap-2">
//             <input type="checkbox" {...formik.getFieldProps("showDevelopedBy")} />
//             Show "Developed By" in footer
//           </label>
//         </Section>

//         {/* CONTACT */}
//         <Section title="Contact Information">
//           <Input label="Phone" name="contact.phone" formik={formik} />
//           <Input
//             label="Email"
//             name="contact.email"
//             type="email"
//             formik={formik}
//           />
//           <Input label="Address" name="contact.address" formik={formik} />
//         </Section>

//         {/* SOCIAL */}
//         <Section title="Social Accounts">
//           {["facebook", "instagram", "twitter", "linkedin"].map((key) => (
//             <Input
//               key={key}
//               label={`${key} URL`}
//               name={`socialLinks.${key}`}
//               formik={formik}
//             />
//           ))}
//         </Section>

//         {/* FOOTER LINKS */}
//         <Section title="Footer Links">
//           <button
//             type="button"
//             onClick={addLink}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             + Add Link
//           </button>

//           {formik.values.links.map((l, i) => (
//             <div
//               key={i}
//               className="border rounded-xl p-4 bg-gray-50 space-y-4"
//             >
//               <Input label="Label" name={`links.${i}.label`} formik={formik} />
//               <Input
//                 label="URL"
//                 name={`links.${i}.url`}
//                 placeholder="/about"
//                 formik={formik}
//               />

//               <div>
//                 <label className="text-sm font-medium">Link Type</label>
//                 <select
//                   value={l.type}
//                   onChange={(e) =>
//                     updateLink(i, "type", e.target.value)
//                   }
//                   className="w-full mt-1 p-3 border rounded-lg"
//                 >
//                   <option value="quick">Quick Link</option>
//                   <option value="important">Important Link</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 flex-wrap items-center">
//                 <button
//                   type="button"
//                   onClick={() => toggleActive(i)}
//                   className={`px-4 py-2 rounded ${
//                     l.isActive
//                       ? "bg-green-600 text-white"
//                       : "bg-gray-300"
//                   }`}
//                 >
//                   {l.isActive ? "Active" : "Inactive"}
//                 </button>

//                 <button type="button" onClick={() => moveLink(i, -1)}>⬆</button>
//                 <button type="button" onClick={() => moveLink(i, 1)}>⬇</button>

//                 <button
//                   type="button"
//                   onClick={() => removeLink(i)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </Section>

//         {/* SUBMIT */}
//         <button
//           type="submit"
//           disabled={saving}
//           className="bg-indigo-600 text-white font-bold py-3 rounded-xl w-full"
//         >
//           {saving ? <Loader2 className="animate-spin mx-auto" /> : "Update Footer"}
//         </button>
//       </form>
//     </div>
//   );
// }

// /* INPUT */
// function Input({ label, name, type = "text", formik, placeholder }) {
//   const error = formik.touched[name] && formik.errors[name];
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...formik.getFieldProps(name)}
//         className={`w-full p-3 border rounded-lg mt-1 ${
//           error ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {error && <p className="text-red-500 text-xs">{formik.errors[name]}</p>}
//     </div>
//   );
// }

// /* SECTION */
// function Section({ title, children }) {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold">{title}</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {children}
//       </div>
//       <hr />
//     </div>
//   );
// }




import { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useGetSuperAdminFooterQuery,
  useUpdateSuperAdminFooterMutation,
} from "../redux/apis/superAdminFooterApi";
import { Loader2 } from "lucide-react";

/* ================= DEFAULT LINK ================= */
const emptyLink = {
  label: "",
  url: "",
  type: "quick",
  isActive: true,
  order: 1,
};

export default function SuperAdminFooterEditor() {
  const { data, isLoading } = useGetSuperAdminFooterQuery();
  const [updateFooter, { isLoading: saving }] =
    useUpdateSuperAdminFooterMutation();

  const footer = data?.data;

  /* ================= INITIAL VALUES ================= */
  const initialValues = useMemo(
    () => ({
      brandText: footer?.brandText || "",
      copyrightText: footer?.copyrightText || "",
      developedByText: footer?.developedByText || "",
      showDevelopedBy: footer?.showDevelopedBy ?? true,

      contact: {
        phone: footer?.contact?.phone || "",
        email: footer?.contact?.email || "",
        address: footer?.contact?.address || "",
      },

      socialLinks: {
        facebook: footer?.socialLinks?.facebook || "",
        instagram: footer?.socialLinks?.instagram || "",
        twitter: footer?.socialLinks?.twitter || "",
        linkedin: footer?.socialLinks?.linkedin || "",
      },

      links: Array.isArray(footer?.links)
        ? [...footer.links].sort((a, b) => a.order - b.order)
        : [],
    }),
    [footer]
  );

  /* ================= FORMIK ================= */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,

    validationSchema: Yup.object({
      brandText: Yup.string().required("Brand text is required"),
      contact: Yup.object({
        email: Yup.string().email("Invalid email"),
      }),
    }),

    onSubmit: async (values) => {
      try {
        const cleanLinks = values.links
          .filter((l) => l.label.trim() && l.url.trim())
          .map((l, i) => ({ ...l, order: i + 1 }));

        await updateFooter({
          ...values,
          brandText: values.brandText.trim(),
          copyrightText: values.copyrightText.trim(),
          developedByText: values.developedByText.trim(),
          links: cleanLinks,
        }).unwrap();

        toast.success("Footer updated successfully 🎯");
      } catch {
        toast.error("Update failed ❌");
      }
    },
  });

  /* ================= LINK HANDLERS ================= */
  const addLink = () =>
    formik.setFieldValue("links", [
      ...formik.values.links,
      { ...emptyLink, order: formik.values.links.length + 1 },
    ]);

  const updateLink = (i, key, value) =>
    formik.setFieldValue(
      "links",
      formik.values.links.map((l, idx) =>
        idx === i ? { ...l, [key]: value } : l
      )
    );

  const removeLink = (i) =>
    formik.setFieldValue(
      "links",
      formik.values.links
        .filter((_, idx) => idx !== i)
        .map((l, idx) => ({ ...l, order: idx + 1 }))
    );

  const toggleActive = (i) =>
    updateLink(i, "isActive", !formik.values.links[i].isActive);

  const moveLink = (i, dir) => {
    const list = [...formik.values.links];
    const target = i + dir;
    if (target < 0 || target >= list.length) return;
    [list[i], list[target]] = [list[target], list[i]];
    formik.setFieldValue(
      "links",
      list.map((l, idx) => ({ ...l, order: idx + 1 }))
    );
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <p className="text-center py-20 text-gray-500">
        Loading footer settings...
      </p>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-8">
        SuperAdmin Footer Settings
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-12">

        {/* BASIC */}
        <Section title="Basic Details">
          <Input label="Brand Text" name="brandText" formik={formik} />
          <Input label="Copyright Text" name="copyrightText" formik={formik} />
          <Input label="Developed By Text" name="developedByText" formik={formik} />

          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              {...formik.getFieldProps("showDevelopedBy")}
              className="accent-indigo-600"
            />
            Show “Developed By” text
          </label>
        </Section>

        {/* CONTACT */}
        <Section title="Contact Information">
          <Input label="Phone" name="contact.phone" formik={formik} />
          <Input label="Email" name="contact.email" type="email" formik={formik} />
          <Input label="Address" name="contact.address" formik={formik} />
        </Section>

        {/* SOCIAL */}
        <Section title="Social Accounts">
          {["facebook", "instagram", "twitter", "linkedin"].map((key) => (
            <Input
              key={key}
              label={`${key} URL`}
              name={`socialLinks.${key}`}
              formik={formik}
            />
          ))}
        </Section>

        {/* LINKS */}
        <Section title="Footer Links">
          <button
            type="button"
            onClick={addLink}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Link
          </button>

          {formik.values.links.length === 0 && (
            <p className="text-sm text-gray-500">
              No footer links added yet.
            </p>
          )}

          {formik.values.links.map((l, i) => (
            <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-4">
              <Input label="Label" name={`links.${i}.label`} formik={formik} />
              <Input label="URL" name={`links.${i}.url`} formik={formik} />

              <select
                value={l.type}
                onChange={(e) => updateLink(i, "type", e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="quick">Quick Link</option>
                <option value="important">Important Link</option>
              </select>

              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => toggleActive(i)}
                  className={`px-4 py-1 rounded ${
                    l.isActive
                      ? "bg-green-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {l.isActive ? "Active" : "Inactive"}
                </button>

                <button type="button" onClick={() => moveLink(i, -1)}>⬆</button>
                <button type="button" onClick={() => moveLink(i, 1)}>⬇</button>

                <button
                  type="button"
                  onClick={() => removeLink(i)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </Section>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white font-bold py-3 rounded-xl w-full"
        >
          {saving ? <Loader2 className="animate-spin mx-auto" /> : "Update Footer"}
        </button>
      </form>
    </div>
  );
}

/* ================= INPUT ================= */
function Input({ label, name, type = "text", formik }) {
  const error = formik.touched[name] && formik.errors[name];
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        {...formik.getFieldProps(name)}
        className={`w-full p-3 border rounded-lg mt-1 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* ================= SECTION ================= */
function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
      <hr />
    </div>
  );
}
