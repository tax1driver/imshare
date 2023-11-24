import type { Metadata } from 'next'
import { Open_Sans as MainFont } from 'next/font/google'
import ActiveLink from '@/components/activeLink'
import { getServerSession } from 'next-auth/next'

import './globals.css'
import './styles.scss'
import Link from 'next/link'
import AccountSection from '@/components/accountSection'
import authOptions from '@/globals/authOptions'
import classNames from 'classnames'


const mainFont = MainFont({ weight: "400" , subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Imshare (nextJS)',
}

export default async function RootLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	const authorized = await getServerSession(authOptions);
	

	return (
		<html lang="en">
			<body className={mainFont.className + " min-h-screen"}>
				<header className="p-12 flex">
					<div>
						<h1 className="text-3xl font-bold">Imshare</h1>
						<h5 className="text-sm text-gray-500">Temporary file sharing service</h5>
					</div>
					<div className="ml-auto flex items-center gap-8">
						<AccountSection />
					</div>
				</header>
				<nav className={classNames("flex p-[2px] bg-zinc-900 rounded-2xl mx-auto w-max gap-2" , { "invisible" : !authorized })}>
					<ActiveLink href="/upload" className="nav-btn" activeClassName="active">Upload</ActiveLink>
					<ActiveLink href="/download" className="nav-btn" activeClassName="active">Download</ActiveLink>
					<ActiveLink href="/files" className="nav-btn" activeClassName="active">My files</ActiveLink>
				</nav>

				<main className="flex flex-col justify-center items-center mb-10 mt-20">
					{children}
				</main>

				<footer className="flex flex-row my-24 justify-center gap-8 text-slate-400 font-medium">
					<a href="https://immune.pw" className="hover:text-slate-200 transition">Immune</a>
					<a href="https://github.com/immunedev/imsharev2" className="hover:text-slate-200 transition">Github</a>
					<Link href="/tos" className="hover:text-slate-200 transition">TOS</Link>
					<Link href="/privacy" className="hover:text-slate-200 transition">Privacy policy</Link>		
				</footer>
			</body>
		</html>	
	)
}
