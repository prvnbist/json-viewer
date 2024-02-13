'use client'

import classes from './page.module.css'

import { Editor, Viewer } from './sections'

function Home() {
   return (
      <div className={classes.container}>
         <Editor />
         <Viewer />
      </div>
   )
}

export default Home
