import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'JSON',
	description: 'JSON viewer',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript defaultColorScheme="dark" />
			</head>
			<body className={inter.className}>
				<MantineProvider
					defaultColorScheme="dark"
					theme={{
						fontFamily: inter.style.fontFamily,
					}}
				>
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}
