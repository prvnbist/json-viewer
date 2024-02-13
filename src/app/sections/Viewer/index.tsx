import { useMemo, useState } from 'react'
import toJsonSchema from 'to-json-schema'

import { Tabs } from '@mantine/core'
import { Editor } from '@monaco-editor/react'

import useGlobalStore from '@/state'

const EDITOR_OPTIONS = {
   readonly: true,
   padding: {
      top: 16,
      bottom: 16,
   },
}

const tabStyles = {
   root: {
      height: '100%',
   },
   list: {
      height: '100%',
   },
   tabLabel: {
      fontSize: '13px',
   },
}

const VIEWS = {
   SCHEMA: (value: string) => (
      <Editor
         theme="vs-dark"
         value={value}
         onChange={() => {}}
         defaultLanguage="json"
         options={EDITOR_OPTIONS}
      />
   ),
}

const Viewer = () => {
   const [tab, setTab] = useState<keyof typeof VIEWS>('SCHEMA')

   const content = useGlobalStore(state => state.content)

   const schema = useMemo(() => {
      if (content) {
         try {
            const _content = toJsonSchema(JSON.parse(content), { arrays: { mode: 'tuple' } })
            return JSON.stringify(_content, null, 3)
         } catch (error) {
            return ''
         }
      }
      return ''
   }, [content])

   return (
      <main>
         <header>
            <Tabs
               value={tab}
               styles={tabStyles}
               defaultValue="SCHEMA"
               onChange={value => setTab(value as keyof typeof VIEWS)}>
               <Tabs.List>
                  <Tabs.Tab value="SCHEMA">Schema</Tabs.Tab>
               </Tabs.List>
            </Tabs>
         </header>
         <main>{tab === 'SCHEMA' && VIEWS[tab](schema)}</main>
      </main>
   )
}

export default Viewer
