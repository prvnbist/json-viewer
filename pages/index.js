import React from 'react'

import { Editor, Viewer } from '../sections'

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
         <Viewer json={json} status={status} />
      </div>
   )
}
