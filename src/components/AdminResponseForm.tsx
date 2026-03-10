"use client";

import { useState } from "react";
import { updateProjectStatus } from "@/app/actions/projects";
import { CheckCircle, XCircle, Clock, Save } from "lucide-react";

export default function AdminResponseForm({ requestId, currentStatus, currentNotes }: any) {
  const [notes, setNotes] = useState(currentNotes || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: string) => {
    setLoading(true);
    await updateProjectStatus(requestId, newStatus, notes);
    setLoading(false);
    alert("Dispatch Updated!");
  };

  return (
    <div className="mt-6 space-y-4 border-t border-slate-800 pt-6">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Type your feedback to the user..."
        className="w-full bg-black/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 outline-none focus:border-blue-500 transition-all"
        rows={3}
      />

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleUpdate("IN_PROGRESS")}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-blue-900/30 text-blue-400 border border-blue-400/30 rounded-lg text-[10px] font-bold uppercase hover:bg-blue-400 hover:text-white transition-all"
        >
          <Clock className="w-3 h-3" /> In Progress
        </button>

        <button
          onClick={() => handleUpdate("COMPLETED")}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-green-900/30 text-green-400 border border-green-400/30 rounded-lg text-[10px] font-bold uppercase hover:bg-green-400 hover:text-white transition-all"
        >
          <CheckCircle className="w-3 h-3" /> Complete
        </button>

        <button
          onClick={() => handleUpdate("REJECTED")}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 bg-red-900/30 text-red-400 border border-red-400/30 rounded-lg text-[10px] font-bold uppercase hover:bg-red-400 hover:text-white transition-all"
        >
          <XCircle className="w-3 h-3" /> Reject
        </button>
      </div>
    </div>
  );
}