import type { Metadata } from "next";
import { Rubik, Heebo } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const heebo = Heebo({
  subsets: ["hebrew"],
  variable: "--font-heebo",
});

const rubik = Rubik({
  subsets: ["hebrew"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "BuzzCraft | ייצור לידים באמצעות בינה מלאכותית",
  description: "BuzzCraft הוא פתרון מתקדם לייצור לידים מפייסבוק באמצעות פוסטים אורגניים. זהה באופן אוטומטי לקוחות פוטנציאליים בקבוצות פייסבוק ספציפיות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth theme-transition">
      <body
        className={`${heebo.variable} ${rubik.variable} antialiased`}
      >
        <ThemeProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
