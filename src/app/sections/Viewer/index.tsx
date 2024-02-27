'use client'

import { useMemo, useState } from 'react'
import toJsonSchema from 'to-json-schema'

import { Box, ScrollArea, Tabs } from '@mantine/core'
import { Editor } from '@monaco-editor/react'

import useGlobalStore from '@/state'
import DataTable from './Table'

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
   SCHEMA: (value: Record<any, any>) => (
      <Editor
         theme="vs-dark"
         onChange={() => {}}
         defaultLanguage="json"
         options={EDITOR_OPTIONS}
         value={JSON.stringify(value, null, 3)}
      />
   ),
   TABLE: (value: Record<any, any>, schema: Record<any, any>) => (
      <Box p={16}>
         <ScrollArea h={'calc(100vh - 120px)'} offsetScrollbars>
            <DataTable value={value} schema={schema} />
         </ScrollArea>
      </Box>
   ),
}

const Viewer = () => {
   const [tab, setTab] = useState<keyof typeof VIEWS>('TABLE')

   const content = useGlobalStore(state => state.content)

   const json = useMemo(() => {
      if (content) {
         try {
            return JSON.parse(content)
         } catch (error) {
            return {}
         }
      }
      return {}
   }, [content])

   const schema = useMemo(() => {
      return toJsonSchema(json, { arrays: { mode: 'first' } })
   }, [json])

   return (
      <main>
         <header>
            <Tabs
               value={tab}
               styles={tabStyles}
               onChange={value => setTab(value as keyof typeof VIEWS)}>
               <Tabs.List>
                  <Tabs.Tab value="SCHEMA">Schema</Tabs.Tab>
                  <Tabs.Tab value="TABLE">Table</Tabs.Tab>
               </Tabs.List>
            </Tabs>
         </header>
         <main>
            {tab === 'SCHEMA' && VIEWS[tab](schema)}
            {tab === 'TABLE' && VIEWS[tab](json, schema)}
         </main>
      </main>
   )
}

export default Viewer
