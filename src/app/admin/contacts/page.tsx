"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Trash2, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setContacts(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load support tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact ticket?")) return;

    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
      setSuccessMsg("Ticket deleted successfully.");
      fetchContacts();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete ticket.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Support Inquiries</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Review and manage devotee feedback and contact requests.
          </p>
        </div>
        <button
          onClick={fetchContacts}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-orange bg-brand-orange/10 px-4 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Lists
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

      {/* Tickets List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-450 font-semibold">Loading Inquiries...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 text-xs">
          No message submissions found in the database.
        </div>
      ) : (
        <div className="space-y-6">
          {contacts.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl border border-[#cfa856]/20 p-6 sm:p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 flex-grow max-w-4xl text-xs font-semibold text-stone-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-sm text-stone-900">{c.name}</h3>
                    <p className="text-[10px] text-stone-400 mt-0.5">{c.email}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-brand-orange uppercase tracking-wider font-bold block mb-1">
                    Subject: {c.subject}
                  </span>
                  <p className="text-stone-550 leading-relaxed font-sans font-light bg-[#faf6ee]/50 border border-stone-200/40 rounded-2xl p-4">
                    {c.message}
                  </p>
                </div>
                <span className="text-[9px] text-stone-400 block pt-1">
                  Submitted: {new Date(c.created_at).toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => handleDelete(c.id)}
                className="flex items-center gap-1.5 py-2.5 px-5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all cursor-pointer self-end md:self-center"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
