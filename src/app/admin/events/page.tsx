"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Calendar, Plus, Edit2, Trash2, X, Upload, Save, CheckCircle2, AlertCircle } from "lucide-react";
import Image from "next/image";

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED";
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<"UPCOMING" | "ONGOING" | "COMPLETED">("UPCOMING");

  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      
      if (error) throw error;
      setEvents(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openAddModal = () => {
    setEditingEvent(null);
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
    setImageUrl("");
    setStatus("UPCOMING");
    setSuccessMsg("");
    setErrorMsg("");
    setShowModal(true);
  };

  const openEditModal = (e: EventItem) => {
    setEditingEvent(e);
    setTitle(e.title);
    setDate(e.date);
    setLocation(e.location);
    setDescription(e.description);
    setImageUrl(e.image_url);
    setStatus(e.status);
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
      const filePath = `events/${fileName}`;

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
      setSuccessMsg("Event cover image uploaded!");
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
    if (!title || !date || !location || !description || !imageUrl) {
      setErrorMsg("Please fill in all required fields and upload an image.");
      return;
    }

    setActionLoading(true);
    setErrorMsg("");

    try {
      if (editingEvent) {
        // UPDATE
        const { error } = await supabase
          .from("events")
          .update({
            title,
            date,
            location,
            description,
            image_url: imageUrl,
            status,
          })
          .eq("id", editingEvent.id);

        if (error) throw error;
        setSuccessMsg("Event details updated!");
      } else {
        // CREATE
        const { error } = await supabase
          .from("events")
          .insert([
            {
              title,
              date,
              location,
              description,
              image_url: imageUrl,
              status,
            }
          ]);

        if (error) throw error;
        setSuccessMsg("New spiritual event scheduled!");
      }

      setShowModal(false);
      fetchEvents();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      setSuccessMsg("Event cancelled/deleted successfully!");
      fetchEvents();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete event.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Manage Events</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Schedule aartis, solar transit pujas, and digital festival events.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#7b1113] hover:bg-[#a9191d] px-5 py-3 rounded-full transition-all cursor-pointer shadow-md shadow-brand-crimson/10"
        >
          <Plus className="w-4 h-4" />
          Schedule Event
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

      {/* Events List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-450 font-semibold">Loading Events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 text-xs">
          No spiritual events scheduled in database yet. Click button to schedule the first.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-3xl border border-[#cfa856]/20 overflow-hidden shadow-lg flex flex-col justify-between">
              <div>
                <div className="relative h-48 bg-stone-900">
                  <img
                    src={ev.image_url || "/event_shivratri.jpg"}
                    alt={ev.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-sm border border-brand-gold/30 rounded-full px-3 py-1 text-[9px] font-bold text-brand-gold uppercase tracking-wider">
                    {ev.status}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#7b1113]/95 border border-[#cfa856]/20 rounded-xl px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    {ev.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-black text-lg text-stone-900 leading-snug">{ev.title}</h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-1">{ev.location}</p>
                  <p className="text-stone-500 text-xs mt-3 leading-relaxed line-clamp-3">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-3 border-t border-stone-100 mt-4">
                <button
                  onClick={() => openEditModal(ev)}
                  className="flex-grow flex items-center justify-center gap-1.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="flex-grow flex items-center justify-center gap-1.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
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
              {editingEvent ? "Edit Event details" : "Schedule New Event"}
            </h3>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold mb-4">
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Maha Shivratri Maha Aarti"
                  className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Scheduled Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Location *</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kashi Temple"
                    className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Status *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl py-3 px-4 text-xs font-semibold outline-none transition-all"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ONGOING">ONGOING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the special spiritual significance and timings of this ceremony..."
                  className="w-full bg-white/65 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl p-4 text-xs font-medium outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Event Cover Photo *</label>
                <div className="flex items-center gap-4">
                  {imageUrl && (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#cfa856]/35 flex-shrink-0 bg-stone-900">
                      <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="flex-grow flex items-center justify-center gap-2 border border-dashed border-[#cfa856]/40 hover:border-brand-orange rounded-2xl py-5 px-4 cursor-pointer hover:bg-brand-orange/5 transition-all text-xs font-bold text-stone-500">
                    <Upload className="w-4 h-4 text-brand-orange" />
                    {uploading ? "Uploading image..." : "Choose Image (PNG/JPG)"}
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
                  {actionLoading ? "Scheduling..." : "Schedule Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
