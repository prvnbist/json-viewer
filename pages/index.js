import { Editor, Viewer } from '../sections'

export default function IndexPage() {
   return (
      <div className="h-full gap-5 grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
         <Editor />
         <Viewer />
      </div>
   )
}
