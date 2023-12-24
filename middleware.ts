import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"]
})
 
export const config = {
  matcher: ["/create-server", "/servers/", "/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
}