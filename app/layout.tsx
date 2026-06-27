import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Thanos Snake',
  description: 'A perfectly balanced cosmic game.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased overflow-hidden bg-[#050508] text-[#F0F0FF] font-sans">
        {children}
      </body>
    </html>
  );
}
