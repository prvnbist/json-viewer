import React from 'react'
import _ from 'lodash'
import MonacoEditor from '@monaco-editor/react'

import * as Icons from '@heroicons/react/solid'

const findType = value => {
   if (_.isString(value)) return 'string'
   if (_.isNumber(value)) return 'number'
   if (_.isPlainObject(value)) return 'object'
   if (_.isArray(value)) return 'array'
   return ''
}

export default function IndexPage() {
   const [status, setStatus] = React.useState('LOADING')
   const [json, setJson] = React.useState({
      string: 'this is a string',
      number: 123,
      object: {
         one: 'one',
         two: 2,
         nested: {
            three: 3,
            four: 'four',
         },
      },
      array: [
         'this',
         'is',
         'an',
         'array',
         {
            object: {
               five: 'cinco',
            },
         },
      ],
   })

   return (
      <div className="h-full gap-5 grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
         <Editor json={json} setJson={setJson} setStatus={setStatus} />
         <JSONViewer json={json} status={status} />
      </div>
   )
}

const Editor = ({ json, setJson, setStatus }) => {
   const [config, setConfig] = React.useState({
      isPrettified: true,
   })
   function handleEditorChange(value, event) {
      setJson(JSON.parse(value))
   }

   function handleEditorDidMount(editor, monaco) {
      setStatus('LOADED')
   }

   function handleEditorWillMount(monaco) {
      setStatus('LOADING')
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

const JSONViewer = ({ json = {}, status }) => {
   if (status === 'LOADING')
      return (
         <div className="h-full flex items-center justify-center">
            <Loader />
         </div>
      )
   return (
      <section>
         <div className="h-full overflow-y-auto space-y-1">
            {_.map(json, (value, key) => (
               <Renderer
                  key={key}
                  field={key}
                  value={value}
                  type={findType(value)}
               />
            ))}
         </div>
      </section>
   )
}

const Renderer = ({ field, type, value }) => {
   if (_.isString(value) || _.isNumber(value))
      return <Row field={field} value={value} type={type} />
   if (_.isPlainObject(value) || _.isArray(value))
      return <ObjectCell field={field} value={value} type={type} />
   return null
}

const ObjectCell = ({ field, value, type }) => {
   const [isOpen, setIsOpen] = React.useState(false)
   return (
      <div className="object__cell">
         <Row
            type={type}
            field={field}
            isOpen={isOpen}
            size={_.size(value)}
            onClick={() => setIsOpen(!isOpen)}
         />
         <div className={`ml-6 space-y-1 mt-1 ${isOpen ? 'block' : 'hidden'}`}>
            {_.map(value, (_value, key) => (
               <Renderer
                  key={key}
                  field={key}
                  value={_value}
                  type={findType(_value)}
               />
            ))}
         </div>
      </div>
   )
}

const Row = props => {
   const {
      type,
      isOpen,
      field = '',
      size = null,
      value = null,
      onClick = null,
   } = props
   return (
      <div className="bg-white flex items-center h-8 px-2 rounded border border-gray-200">
         <span
            className={`
          flex-shrink-0 inline-block text-white rounded mr-2 text-xs font-medium px-1 
          ${type === 'string' ? 'bg-[#54a483]' : ''} 
          ${type === 'number' ? 'bg-[#3e97d8]' : ''}
          ${['object', 'array'].includes(type) ? 'bg-gray-300' : ''}`}
         >
            {type === 'string' && 'az'}
            {type === 'number' && '12'}
            {type === 'object' && '{ }'}
            {type === 'array' && '[ ]'}
         </span>
         <span
            title={field}
            className="text-sm font-medium truncate flex-shrink-0 inline-block w-[120px] md:w-[180px]"
         >
            {field}
         </span>
         <p
            className="text-sm pl-2 truncate text-gray-400 font-[400]"
            title={value}
         >
            {value}
         </p>
         {['object', 'array'].includes(type) && (
            <aside className="ml-auto flex items-center">
               <span className="text-gray-400">{`{ ${size} }`}</span>
               {size > 0 && (
                  <span
                     onClick={onClick}
                     className="ml-2 cursor-pointer h-5 w-5 flex items-center justify-center mr-[-2px] rounded bg-gray-100"
                  >
                     {isOpen ? (
                        <Icons.ChevronDownIcon className="h-5 w-5 text-gray-700" />
                     ) : (
                        <Icons.ChevronRightIcon className="h-5 w-5 text-gray-700" />
                     )}
                  </span>
               )}
            </aside>
         )}
      </div>
   )
}

const Loader = () => {
   return (
      <svg
         width="38"
         height="38"
         viewBox="0 0 38 38"
         xmlns="http://www.w3.org/2000/svg"
      >
         <defs>
            <linearGradient
               x1="8.042%"
               y1="0%"
               x2="65.682%"
               y2="23.865%"
               id="a"
            >
               <stop stopColor="gray" stopOpacity="0" offset="0%" />
               <stop stopColor="gray" stopOpacity=".631" offset="63.146%" />
               <stop stopColor="gray" offset="100%" />
            </linearGradient>
         </defs>
         <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
               <path
                  d="M36 18c0-9.94-8.06-18-18-18"
                  id="Oval-2"
                  stroke="url(#a)"
                  strokeWidth="2"
               >
                  <animateTransform
                     attributeName="transform"
                     type="rotate"
                     from="0 18 18"
                     to="360 18 18"
                     dur="0.9s"
                     repeatCount="indefinite"
                  />
               </path>
               <circle fill="#fff" cx="36" cy="18" r="1">
                  <animateTransform
                     attributeName="transform"
                     type="rotate"
                     from="0 18 18"
                     to="360 18 18"
                     dur="0.9s"
                     repeatCount="indefinite"
                  />
               </circle>
            </g>
         </g>
      </svg>
   )
}

const Icon = {
   Shrink: ({ size = 20 }) => (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 16 16"
      >
         <path
            fill="#627583"
            d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
         />
      </svg>
   ),
   Extend: ({ size = 20 }) => (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 16 16"
      >
         <path
            fill="#627583"
            d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
         />
      </svg>
   ),
}
