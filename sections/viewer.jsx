import map from 'lodash/map'

import { findType } from '../utils'
import { Loader, Renderer } from '../components'

export const Viewer = ({ json = {}, status }) => {
   if (status === 'LOADING')
      return (
         <div className="h-full flex items-center justify-center">
            <Loader />
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
