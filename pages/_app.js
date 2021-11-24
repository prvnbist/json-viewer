import { StateProvider } from '../store'

import '../styles.css'

function MyApp({ Component, pageProps }) {
   return (
      <StateProvider>
         <Component {...pageProps} />
      </StateProvider>
   )
}

export default MyApp
