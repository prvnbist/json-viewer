'use client'

import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'

import './page.css'

import { Editor, Viewer } from './sections'

function Home() {
	return (
		<div className="container">
			<PanelGroup direction="horizontal">
				<Panel defaultSize={30} minSize={20}>
					<Editor />
				</Panel>
				<PanelResizeHandle id="resize_handle">
					<ResizeIcon />
				</PanelResizeHandle>
				<Panel minSize={30} maxSize={70}>
					<Viewer />
				</Panel>
			</PanelGroup>
		</div>
	)
}

export default Home

const ResizeIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>resize handle</title>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		</svg>
	)
}
