import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes REQUIRE a login
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", 
  "/members(.*)",
  "/admin(.*)" // Added just in case you use this path later
]);

// 2. Define which routes are ALWAYS public (like your landing page and webhooks)
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks/clerk(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is protected AND the user isn't on a public route, protect it
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};