import '../src/style.css'

export const metadata = {
  title: 'Hmm..',
  description: 'Search page application',
  icons: {
    icon: '/vite.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>{children}</body>
    </html>
  )
}