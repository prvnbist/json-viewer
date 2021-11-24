import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
   }

   render() {
      return (
         <Html>
            <Head>
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin
               />
               <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                  rel="stylesheet"
               />
               <script src="https://cdn-tailwindcss.vercel.app/"></script>
               <script
                  async
                  defer
                  data-website-id="a50162c9-6811-4554-813a-45aeaa9a4742"
                  src="https://x-umami.vercel.app/umami.js"
               ></script>
            </Head>
            <body className="p-5 bg-[#ECECF4]">
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument
