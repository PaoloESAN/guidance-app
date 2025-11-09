import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AntProvider } from "@/components/providers/ant-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Guia de formación",
    description: "Creada para ayudar",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${inter.className} antialiased`}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <AntdRegistry>
                        <AntProvider>{children}</AntProvider>
                    </AntdRegistry>
                </ThemeProvider>
            </body>
        </html>
    );
}
