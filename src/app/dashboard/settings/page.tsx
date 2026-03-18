import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { Settings, Shield, User } from "lucide-react";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-[#1a120b] text-[#e5d3b3] font-serif pb-20 relative">
      {/* Paper Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('/patterns/natural-paper.webp')" }} 
      />

      {/* Header */}
      <header className="px-8 py-12 border-b-4 border-[#2b1d15] bg-[#2b1d15]/30 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Settings className="w-10 h-10 text-[#b85c38]" />
          <div>
            <h1 className="text-4xl font-black text-[#b85c38] tracking-tighter uppercase italic">
              Account Settings
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#e5d3b3]/40">
              Frontier ID & Credentials Management
            </p>
          </div>
        </div>
      </header>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-8 py-12 relative z-10">
        <div className="bg-[#2b1d15]/60 border-2 border-[#3d2b1f] p-1 shadow-[10px_10px_0px_rgba(0,0,0,0.3)]">
          <div 
            className="p-8 border border-[#b85c38]/20"
            style={{ backgroundImage: "url('/patterns/paper-fibers.webp')" }}
          >
            {/* Custom Clerk Styling to match the brand */}
            <UserProfile 
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none border-none",
                  navbar: "hidden", // We already have your sidebar/nav
                  headerTitle: "text-[#e5d3b3] font-serif uppercase tracking-widest",
                  headerSubtitle: "text-[#e5d3b3]/60 font-serif italic",
                  formButtonPrimary: "bg-[#b85c38] hover:bg-[#a04a28] text-[#1a120b] font-black uppercase rounded-none border-2 border-[#e5d3b3]/20",
                  formFieldInput: "bg-[#1a120b] border-2 border-[#3d2b1f] text-[#e5d3b3] rounded-none focus:border-[#b85c38]",
                  formFieldLabel: "text-[#e5d3b3]/80 uppercase tracking-widest font-bold text-[10px]",
                  userPreviewMainIdentifier: "text-[#e5d3b3] font-bold",
                  userPreviewSecondaryIdentifier: "text-[#b85c38]",
                  identityPreviewText: "text-[#e5d3b3]",
                  breadcrumbs: "hidden"
                }
              }}
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 p-6 border-2 border-dashed border-[#b85c38]/30 flex items-start gap-4">
          <Shield className="w-6 h-6 text-[#b85c38] shrink-0" />
          <div className="text-xs font-serif italic text-[#e5d3b3]/60 leading-relaxed">
            All credential updates are logged and encrypted. Ensure your two-factor authentication is active to maintain high-stakes security clearance within the Frontier Intelligence Agency.
          </div>
        </div>
      </div>
    </main>
  );
}