import React from "react"
import Link from "next/link"

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div id="layout">
      <header>
        <Link href="/">
          <h1>Akhila Ariyachandra</h1>
        </Link>
      </header>

      {children}

      <style jsx>{`
        #layout {
          max-width: 1000px;
          margin: auto;
          padding: 1.5rem;
        }
      `}</style>
    </div>
  )
}

export default Layout
