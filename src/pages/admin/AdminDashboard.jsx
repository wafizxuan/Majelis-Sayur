import React, { useState, useEffect } from "react";
import { farmerLocations as initialFarmers } from "../../data/farmerLocations";
import { products as initialProducts } from "../../data/products";
import { upcomingEvents as initialEvents } from "../../data/events";

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState(() => {
    const saved = localStorage.getItem("majelis_farmers");
    return saved ? JSON.parse(saved) : initialFarmers;
  });
  const [products, setProducts] = useState(initialProducts);
  const [events, setEvents] = useState(initialEvents);

  // Form states... (tambahkan untuk product/event jika perlu)

  useEffect(() => {
    localStorage.setItem("majelis_farmers", JSON.stringify(farmers));
  }, [farmers]);

  const handleAdd = (e) => {
    e.preventDefault();
    const newFarmer = { ...formData, id: Date.now() };
    setFarmers([...farmers, newFarmer]);
    setFormData({ name: "", type: "", address: "", farmer: "" });
  };

  const handleDelete = (id) => {
    setFarmers(farmers.filter((f) => f.id !== id));
  };

  return (
    <div
      className="p-10 max-w-4xl mx-auto"
      style={{ background: "#F5F0E8", minHeight: "100vh" }}
    >
      <h1 className="text-3xl font-bold mb-8 text-[#2D3A22]">
        Kelola Data Petani
      </h1>

      <form
        onSubmit={handleAdd}
        className="mb-8 p-6 border border-[#D4C9B0] bg-[#EDE5D4]"
      >
        <h2 className="text-lg font-bold mb-4">Tambah Petani Baru</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="p-2 border"
            placeholder="Nama Kebun"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            className="p-2 border"
            placeholder="Tipe"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
          <input
            className="p-2 border"
            placeholder="Alamat"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <input
            className="p-2 border"
            placeholder="Nama Pengelola"
            value={formData.farmer}
            onChange={(e) =>
              setFormData({ ...formData, farmer: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#4A5E3A] text-white"
        >
          Tambah Petani
        </button>
      </form>

      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-[#EDE5D4]">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Tipe</th>
            <th className="border p-2">Pengelola</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              <td className="border p-2">{farmer.name}</td>
              <td className="border p-2">{farmer.type}</td>
              <td className="border p-2">{farmer.farmer}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDelete(farmer.id)}
                  className="text-red-600 font-bold"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
