import MonacoEditor from '@monaco-editor/react'
import { IconClearAll, IconClipboard, IconSparkles, IconTrash } from '@tabler/icons-react'

import { ActionIcon, CopyButton } from '@mantine/core'

import useGlobalStore from '@/state'

const EDITOR_OPTIONS = {
	padding: {
		top: 16,
		bottom: 16,
	},
}

const Editor = () => {
	const format = useGlobalStore(state => state.formatContent)
	const [isEditorMounted, setIsEditorMounted] = useGlobalStore(state => [
		state.isEditorMounted,
		state.setIsEditorMounted,
	])
	const [content, setContent] = useGlobalStore(state => [state.content, state.setContent])
	return (
		<aside id="editor">
			<header>
				<ActionIcon
					color="gray"
					title="Format"
					variant="subtle"
					onClick={format}
					disabled={!isEditorMounted}
				>
					<IconSparkles size={18} />
				</ActionIcon>
				<CopyButton value={content}>
					{({ copy }) => (
						<ActionIcon
							color="gray"
							title="Copy"
							variant="subtle"
							onClick={copy}
							disabled={!isEditorMounted}
						>
							<IconClipboard size={16} />
						</ActionIcon>
					)}
				</CopyButton>
				<ActionIcon
					color="gray"
					title="Clear"
					variant="subtle"
					onClick={() => setContent('')}
					disabled={!isEditorMounted}
				>
					<IconTrash size={18} />
				</ActionIcon>
			</header>
			<main>
				<MonacoEditor
					theme="vs-dark"
					value={content}
					defaultLanguage="json"
					options={EDITOR_OPTIONS}
					onMount={() => setIsEditorMounted(true)}
					onChange={value => setContent(value ?? '')}
				/>
			</main>
		</aside>
	)
}

export default Editor
