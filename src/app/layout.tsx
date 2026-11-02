import type { Metadata } from "next";
import { Geist_Mono, DM_Sans, Bricolage_Grotesque } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toast";

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const bricolageGrotesk = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage' })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artefact Tasks",
  description: "Tasks management for Artefact challenge",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans",
        dmSans.variable,
        bricolageGrotesk.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <TRPCReactProvider>
          <ThemeProvider
            attribute={'class'}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
