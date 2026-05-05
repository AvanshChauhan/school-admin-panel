"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const [form, setForm] = useState({
    school_name: "",
    school_code: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/admin/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "YOUR_ADMIN_KEY_HERE", //admin
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("School created successfully");

      router.push("/admin/schools");
    } catch (err) {
      console.error(err);
      alert(err.message || "Error creating school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create School</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-zinc-900 p-6 rounded-xl"
      >
        <div>
          <label>School Name</label>
          <input
            name="school_name"
            value={form.school_name}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        <div>
          <label>School Code</label>
          <input
            name="school_code"
            value={form.school_code}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-zinc-800 border border-zinc-700"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-green-500 p-2 rounded"
        >
          {loading ? "Creating..." : "Create School"}
        </button>
      </form>
    </div>
  );
}