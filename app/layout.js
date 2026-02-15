import './globals.css'

export const metadata = {
  title: 'Slack for School - AI HUD',
  description: 'Focus-first task management with Sanctuary Mode',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
