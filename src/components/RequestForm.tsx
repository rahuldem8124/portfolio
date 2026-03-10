"use client";

import { createProjectRequest } from "@/app/actions/projects";
import { useRef } from "react";
import { Send } from "lucide-react";

export default function RequestForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await createProjectRequest(formData);
        formRef.current?.reset();
        alert("Request sent to the Frontier!");
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-[10px] uppercase tracking-widest mb-1 text-[#b85c38]">Project Title</label>
        <input 
          name="title" 
          required 
          className="w-full bg-black/40 border border-[#b85c38]/30 rounded p-2 text-sm outline-none focus:border-[#b85c38]" 
          placeholder="e.g. AI Fraud Detector"
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest mb-1 text-[#b85c38]">Details</label>
        <textarea 
          name="description" 
          required 
          rows={4}
          className="w-full bg-black/40 border border-[#b85c38]/30 rounded p-2 text-sm outline-none focus:border-[#b85c38]" 
          placeholder="Describe your vision..."
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-[#b85c38] text-[#1a120b] font-black uppercase py-3 rounded hover:bg-[#e5d3b3] transition-colors flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" /> Dispatch Request
      </button>
    </form>
  );
}