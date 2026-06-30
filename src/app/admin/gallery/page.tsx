"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Plus, Trash2, X, Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  category: "Ritual" | "Temple" | "Festival" | "Community";
  image_url: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"Ritual" | "Temple" | "Festival" | "Community">("Ritual");
  const [imageUrl, setImageUrl] = useState("");

  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("uploaded_at", { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load gallery items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setTitle("");
    setCategory("Ritual");
    setImageUrl("");
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
      const filePath = `gallery/${fileName}`;

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
      setSuccessMsg("Photo uploaded successfully!");
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
    if (!imageUrl) {
      setErrorMsg("Please upload a photo first.");
      return;
    }

    setActionLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase
        .from("gallery")
        .insert([
          {
            title: title || "Ritual Photo",
            category,
            image_url: imageUrl,
          }
        ]);

      if (error) throw error;
      setSuccessMsg("Photo added to the public gallery!");
      setShowModal(false);
      fetchItems();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery photo?")) return;

    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      setSuccessMsg("Photo removed from gallery.");
      fetchItems();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete item.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Media Gallery</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Upload and categorize photos of temple events, festivals, and activities.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#7b1113] hover:bg-[#a9191d] px-5 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-brand-crimson/10"
        >
          <Plus className="w-4 h-4" />
          Upload Photo
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

      {/* Grid List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-450 font-semibold">Loading Gallery...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 text-xs">
          No media uploaded to gallery yet. Click button to upload the first item.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-stone-900 rounded-2xl overflow-hidden aspect-square border border-[#cfa856]/10 shadow-md">
              <img
                src={item.image_url}
                alt={item.title || "Gallery"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[9px] font-bold text-brand-gold bg-[#7b1113]/90 px-2 py-0.5 rounded border border-[#cfa856]/20 self-start uppercase">
                  {item.category}
                </span>
                <p className="text-white text-xs font-bold mt-1.5 truncate">{item.title}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-3 flex items-center justify-center gap-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-bold transition-all cursor-pointer shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf6ee] rounded-3xl border border-[#cfa856]/40 shadow-2xl p-6 sm:p-10 max-w-md w-full relative text-stone-900">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-black text-stone-900 mb-6">Upload Gallery Photo</h3>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold mb-4">
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Photo Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ganga Aarti at Kashi"
                  className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                >
                  <option value="Ritual">Ritual</option>
                  <option value="Temple">Temple</option>
                  <option value="Festival">Festival</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Upload Photo *</label>
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
                  {actionLoading ? "Saving..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
