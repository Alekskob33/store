import Head from 'next/head'

export default function DefaultLayout({children}) {
  return (
    <main>
      {children}
    </main>
  )
}