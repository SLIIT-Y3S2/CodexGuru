import StyledComponentsRegistry from "@/lib/AntRegistry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

// context imports
import AuthProvider from "./AuthProvider";
import { LabProvider } from "@/context/LabProvider";
import { ExamsProvider } from "./context/ExamsContext";
import { ExamQuestionsProvider } from "./context/ExamQuestionsContext";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodexGuru",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LabProvider>
            <ExamsProvider>
              <StyledComponentsRegistry>
                <ExamQuestionsProvider>
                  <ConfigProvider theme={theme}>
                    <main>
                      <Header />
                      {children}
                    </main>
                  </ConfigProvider>
                </ExamQuestionsProvider>
              </StyledComponentsRegistry>
            </ExamsProvider>
          </LabProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
