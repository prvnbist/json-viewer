import { create } from 'zustand'

const DEMO_JSON = {
	string: 'Hello, World!',
	number: 42,
	boolean: true,
	null_value: null,
	array: [
		'string',
		42,
		true,
		null,
		{
			nested_string: 'nested',
			nested_number: 123,
			nested_boolean: false,
			nested_null: null,
			nested_array: [
				'nested_string',
				456,
				true,
				null,
				{
					deeply_nested_string: 'deeply nested',
					deeply_nested_number: 789,
					deeply_nested_boolean: true,
					deeply_nested_null: null,
				},
			],
		},
	],
	object: {
		nested_object: {
			key1: 'value1',
			key2: 123,
			key3: true,
			key4: null,
			key5: {
				deeply_nested_object: {
					nested_key1: 'nested_value1',
					nested_key2: 456,
					nested_key3: false,
					nested_key4: null,
				},
			},
		},
	},
}

interface GlobalStore {
	content: string
	isEditorMounted: boolean
	formatContent: () => void
	setContent: (content: GlobalStore['content']) => void
	setIsEditorMounted: (isEditorMounted: GlobalStore['isEditorMounted']) => void
}

const useGlobalStore = create<GlobalStore>(set => ({
	content: JSON.stringify(DEMO_JSON, null, 3),
	isEditorMounted: false,
	formatContent: () => {
		set(state => ({ content: JSON.stringify(JSON.parse(state.content), null, 3) }))
	},
	setContent: (content: GlobalStore['content']) => set(() => ({ content })),
	setIsEditorMounted: (isEditorMounted: GlobalStore['isEditorMounted']) => {
		set(() => ({ isEditorMounted }))
	},
}))

export default useGlobalStore
