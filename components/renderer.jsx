import React from 'react'
import _ from 'lodash'
import * as Icons from '@heroicons/react/solid'

import { findType } from '../utils'

export const Renderer = ({ field, type, value }) => {
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
