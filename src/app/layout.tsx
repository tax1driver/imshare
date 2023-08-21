import Link from 'next/link'
import './globals.css'
import './styles.scss'
import type { Metadata } from 'next'
import { Inter as MainFont } from 'next/font/google'
import ActiveLink from '@/components/activeLink'

const mainFont = MainFont({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Imshare (nextJS)',
}

export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={mainFont.className + " min-h-screen"}>
				<header className="p-12 flex">
					<div>
						<h1 className="text-3xl font-bold">Imshare</h1>
						<h5 className="text-sm text-gray-500">Temporary file sharing service</h5>
					</div>
					<div className="ml-auto flex items-center">
						<Link href="/login" className="btn">Log in</Link>
					</div>
				</header>
				<nav className="flex p-[2px] bg-zinc-900 rounded-2xl mx-auto w-max gap-2">
					<ActiveLink href="/upload" className="nav-btn" activeClassName="active">Upload</ActiveLink>
					<ActiveLink href="/download" className="nav-btn" activeClassName="active">Download</ActiveLink>
					<ActiveLink href="/myfiles" className="nav-btn" activeClassName="active">My files</ActiveLink>
				</nav>

				<main className="flex flex-col justify-center items-center mb-10 mt-20">
					{children}
				</main>
			</body>
		</html>
	)
}
