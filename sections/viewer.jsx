import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import { findType } from '../utils'
import { useViewer } from '../store'
import { Loader, Renderer } from '../components'

export const Viewer = () => {
   const { status, json } = useViewer()
   if (status === 'LOADING')
      return (
         <div className="h-full flex items-center justify-center">
            <Loader />
         </div>
      )
   if (isEmpty(json))
      return (
         <div className="h-full flex items-center justify-center">
            <p className="text-center text-gray-500">No data to display</p>
         </div>
      )
   return (
      <section>
         <div className="h-full overflow-y-auto space-y-1">
            {map(json, (value, key) => (
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
