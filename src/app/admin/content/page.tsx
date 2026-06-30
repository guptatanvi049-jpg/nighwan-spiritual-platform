"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { RefreshCw, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface PageContentItem {
  id: string;
  page: string;
  section: string;
  content: string;
}

export default function AdminContentPage() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchContents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("page_contents")
        .select("*")
        .order("page");
      
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleContentChange = (id: string, newContent: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, content: newContent } : item))
    );
  };

  const handleUpdate = async (id: string, content: string) => {
    setSavingId(id);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const { error } = await supabase
        .from("page_contents")
        .update({ content })
        .eq("id", id);

      if (error) throw error;

      setSuccessMsg("Section content updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update section.");
    } finally {
      setSavingId(null);
    }
  };

  const filteredItems = items.filter((item) => item.page === activeTab);
  const tabs = ["home", "about", "terms", "privacy"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-stone-900">Edit Page Contents</h1>
          <p className="text-stone-500 text-xs sm:text-sm font-semibold mt-1">
            Modify text paragraphs, vision details, and legal pages dynamically.
          </p>
        </div>
        <button
          onClick={fetchContents}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-orange bg-brand-orange/10 px-4 py-2.5 rounded-full hover:bg-brand-orange hover:text-white transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Reload Content
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === tab
                ? "border-brand-orange text-[#7b1113]"
                : "border-transparent text-stone-400 hover:text-stone-700"
            }`}
          >
            {tab} Page
          </button>
        ))}
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-semibold animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Editors */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-stone-450 font-semibold">Loading CMS Items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 text-stone-400 text-xs">
          No configurable CMS blocks found for this tab page.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-[#cfa856]/20 p-6 sm:p-8 shadow-md space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/15">
                    Section: {item.section}
                  </span>
                  <h3 className="text-xs font-semibold text-stone-400 mt-1 uppercase tracking-widest font-mono">
                    ID: {item.id}
                  </h3>
                </div>
                <button
                  onClick={() => handleUpdate(item.id, item.content)}
                  disabled={savingId === item.id}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-brand-orange hover:bg-orange-600 px-5 py-2.5 rounded-full transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savingId === item.id ? "Saving..." : "Save Changes"}
                </button>
              </div>

              <textarea
                rows={item.id.includes("body") ? 10 : 4}
                value={item.content}
                onChange={(e) => handleContentChange(item.id, e.target.value)}
                className="w-full bg-[#faf6ee]/50 border border-[#cfa856]/30 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/30 rounded-2xl p-4 text-xs font-medium text-stone-700 outline-none transition-all resize-y"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
