"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Landmark, Plus, Edit2, Trash2, X, Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Temple {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url: string;
  live_stream_url: string;
}

const getFallbackImage = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("kashi") || n.includes("varanasi")) return "/temple_kashi.jpg";
  if (n.includes("gaya")) return "/temple_gaya.jpg";
  if (n.includes("sangam") || n.includes("prayagraj")) return "/temple_sangam.jpg";
  return "/temple_hero.png";
};

export default function AdminTemplesPage() {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTemple, setEditingTemple] = useState<Temple | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [liveStreamUrl, setLiveStreamUrl] = useState("");

  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchTemples = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("temples")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setTemples(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load shrines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  const openAddModal = () => {
    setEditingTemple(null);
    setName("");
    setLocation("");
    setDescription("");
    setImageUrl("");
    setLiveStreamUrl("");
    setSuccessMsg("");
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (t: Temple) => {
    setEditingTemple(t);
    setName(t.name);
    setLocation(t.location);
    setDescription(t.description);
    setImageUrl(t.image_url);
    setLiveStreamUrl(t.live_stream_url || "");
    setSuccessMsg("");
    setErrorMsg("");
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMsg("");
    try {
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `temples/${fileName}`;

      // Upload file to Supabase Storage bucket 'nighwan-asset'
      const { error: uploadError } = await supabase.storage
        .from("nighwan-asset")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("nighwan-asset")
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      setSuccessMsg("Cover photo uploaded to storage!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      const msg = err.message || "Failed to upload image.";
      setErrorMsg(msg);
      alert("Upload Error: " + msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !description || !imageUrl) {
      setErrorMsg("Please fill in all required fields and upload an image.");
      return;
    }

    setActionLoading(true);
    setErrorMsg("");

    try {
      if (editingTemple) {
        // UPDATE
        const { error } = await supabase
          .from("temples")
          .update({
            name,
            location,
            description,
            image_url: imageUrl,
            live_stream_url: liveStreamUrl,
          })
          .eq("id", editingTemple.id);

        if (error) throw error;
        setSuccessMsg("Temple details updated!");
      } else {
        // CREATE
        const { error } = await supabase
          .from("temples")
          .insert([
            {
              name,
              location,
              description,
              image_url: imageUrl,
              live_stream_url: liveStreamUrl,
            }
          ]);

        if (error) throw error;
        setSuccessMsg("New Temple shrine added!");
      }

      setShowModal(false);
      fetchTemples();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this shrine?")) return;

    try {
      const { error } = await supabase.from("temples").delete().eq("id", id);
      if (error) throw error;
      setSuccessMsg("Shrine deleted successfully!");
      fetchTemples();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete shrine.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Manage Shrines</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Configure, edit, and update active temple structures.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#7b1113] hover:bg-[#a9191d] px-5 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-brand-crimson/10"
        >
          <Plus className="w-4 h-4" />
          Add Temple Shrine
        </button>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Shrines List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-450 font-semibold">Loading Shrines...</p>
        </div>
      ) : temples.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 text-xs">
          No temples configured in database yet. Click add to configure the first.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {temples.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl border border-[#cfa856]/20 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="relative h-48 bg-stone-900">
                  <img
                    src={t.image_url || "/temple_hero.png"}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = getFallbackImage(t.name);
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-sm border border-brand-gold/30 rounded-full px-3 py-1 text-[9px] font-bold text-brand-gold uppercase tracking-wider">
                    {t.location}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-black text-lg text-stone-900">{t.name}</h3>
                  <p className="text-stone-500 text-xs mt-3 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3 border-t border-stone-100 mt-4">
                <button
                  onClick={() => openEditModal(t)}
                  className="flex-grow flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="flex-grow flex items-center justify-center gap-1.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf6ee] rounded-3xl border border-[#cfa856]/40 shadow-2xl p-6 sm:p-10 max-w-xl w-full max-h-[90vh] overflow-y-auto relative text-stone-900">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-black text-stone-900 mb-6">
              {editingTemple ? "Edit Temple Shrine" : "Add Temple Shrine"}
            </h3>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold mb-4">
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Temple Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kashi Vishwanath Mandir"
                  className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Location Coordinates *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Varanasi, UP"
                    className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Live Stream Embed URL</label>
                  <input
                    type="url"
                    value={liveStreamUrl}
                    onChange={(e) => setLiveStreamUrl(e.target.value)}
                    placeholder="e.g. https://youtube.com/embed/..."
                    className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell devotees about the temple's spiritual history and location energy..."
                  className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl p-4 text-xs font-medium outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Cover Image *</label>
                <div className="flex items-center gap-4">
                  {imageUrl && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#cfa856]/35 flex-shrink-0 bg-stone-900">
                      <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="flex-grow flex items-center justify-center gap-2 border border-dashed border-[#cfa856]/40 hover:border-brand-orange rounded-2xl py-5 px-4 cursor-pointer hover:bg-brand-orange/5 transition-all text-xs font-bold text-stone-500">
                    <Upload className="w-4 h-4 text-brand-orange" />
                    {uploading ? "Uploading file..." : "Choose Image (PNG/JPG)"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200/50">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-stone-100 hover:bg-stone-200 rounded-full text-xs font-bold uppercase tracking-wider text-stone-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploading}
                  className="flex items-center gap-1.5 px-8 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {actionLoading ? "Saving..." : "Save Temple"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
