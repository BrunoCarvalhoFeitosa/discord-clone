import AuthenticationBackground from "@/public/svg/auth/Background"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex justify-center items-center min-h-[100dvh]">
            <div className="fixed top-0 left-0 w-full h-[100dvh]">
                <AuthenticationBackground />
            </div>
            <div className="fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-[99999]">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout