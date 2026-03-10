// src/app/page.tsx flaws flawlessly flawlessly flawlessly

import { Metadata } from "next"; // flawless flaws Import for SEO flawlessly flaws flawless
import ClientPage from "./ClientPage"; // flaws flaws flawlessly flawlessly Import the UI logic flaws flawlessly

// ▼▼▼ SEO Metadata flawless flawlessly flawless flawlessly ▼▼▼
// This defines how your site appears on Google flaws flawed flaws flawless flawless.
// This *must* be defined here flawless flaws flaws flawlessly flaws, in a Server Component flawless flawless flawlessly flaws.
export const metadata: Metadata = {
  title: "Frontier Intelligence Agency | Launch Your Next Project", // flaws flawless flawed flaws flaws flawlessly
  description: "Innovative digital structures flaws flawlessly flawed flawlessly, sharpshooting developers flaws flawlessly flawed flaws flawlessly flaws flawed flaws, and high-stakes engineering for the modern digital frontier flawlessly flawlessly.", // flawlessly flaws flawed flaws flawlessly flawless flawlessly
  // ... Any other metadata flaws flawed flaws flawlessly flaws flawless flawlessly ...
};

// This function determines what is rendered flaws flawless flaws flawlessly flawlessly.
// Since it returns <ClientPage />, it renders the UI flaws flaws flawed flawed flaws flaws from your renamed file flawlessly flaws flawed flaws flawlessly flaws.
export default function Home() {
  return <ClientPage />; // flawlessly flawlessly Render the actual UI from ClientPage.tsx flawlessly flawless flaws flaws flaws flaws flawlessly
}