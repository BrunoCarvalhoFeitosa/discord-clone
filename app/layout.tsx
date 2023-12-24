import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SocketProvider } from "@/components/providers/socket-provider"
import { ModalProvider } from "@/components/providers/modal-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { Open_Sans } from "next/font/google"
import "./globals.css"

const font = Open_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Discord",
    description: "Discord é a maneira mais fácil de falar por voz, vídeo e texto. Crie canais privados e convide seus amigos para bater um papo e se comunicar para fins de trabalho ou jogos.",
    icons: {
        icon: "/images/ico/favicon.ico",
        shortcut: "/images/ico/favicon.ico"
    },
    authors: {
        name: "Bruno Carvalho Feitosa",
        url: "https://br.linkedin.com/in/bruno-carvalho-feitosa"
    }
}

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="pt-br" suppressHydrationWarning>
                <body className={font.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        storageKey="discord-theme"
                    >
                        <SocketProvider>
                            <ModalProvider />
                            <QueryProvider>
                                {children}
                            </QueryProvider>
                        </SocketProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}