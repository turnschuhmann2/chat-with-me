import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default clerkMiddleware();

const isProtectedRoute = createRouteMatcher(["/chatbot(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) auth().protect();
});

// export const config = {
//   matcher: ["/((?!.*..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
