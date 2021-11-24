import React from 'react'
import MonacoEditor from '@monaco-editor/react'

import * as Icon from '../icons'
import { useViewer } from '../store'
import { Loader } from '../components'

export const Editor = () => {
   const { json, dispatch } = useViewer()
   const [config, setConfig] = React.useState({
      isPrettified: true,
   })
   function handleEditorChange(value) {
      dispatch({ type: 'SET_JSON', payload: JSON.parse(value) })
   }

   function handleEditorDidMount() {
      dispatch({ type: 'SET_STATUS', payload: 'LOADED' })
   }

   function handleEditorWillMount() {
      dispatch({ type: 'SET_STATUS', payload: 'LOADING' })
   }

   return (
      <section>
         <header className="space-x-1 flex items-center pl-1 h-10 mb-3 bg-white border border-gray-200 w-full rounded-lg">
            <button
               title="Uglify"
               onClick={() =>
                  setConfig(config => ({
                     ...config,
                     isPrettified: false,
                  }))
               }
               className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100"
            >
               <Icon.Shrink className="stroke-current text-gray-500" />
            </button>
            <button
               title="Prettify"
               onClick={() =>
                  setConfig(config => ({
                     ...config,
                     isPrettified: true,
                  }))
               }
               className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100"
            >
               <Icon.Extend className="stroke-current text-gray-500" />
            </button>
         </header>
         <main id="editor__container" className="overflow-hidden rounded-lg">
            <MonacoEditor
               width="100%"
               height="100%"
               defaultValue="{}"
               loading={<Loader />}
               defaultLanguage="json"
               onChange={handleEditorChange}
               onMount={handleEditorDidMount}
               beforeMount={handleEditorWillMount}
               value={JSON.stringify(json, null, config.isPrettified ? 2 : 0)}
            />
         </main>
      </section>
   )
}
