import '../styles/globals.css'

//Internal Import
import {ChatAppProvider} from '../Context/ChatAppContext'
import {NavBar} from '../Components/index'


const MyApp = ({ Component, pageProps }) => {
  return(
   <div>
    <ChatAppProvider>
      <NavBar/>
    <Component {...pageProps} />
    </ChatAppProvider>
   </div>
  )
  
}

export default MyApp


// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }
 
// export default function RootLayout({ children }) {
//  return (
    
//       <body>
       
//         {children}
//         </body>
    
//   )
// }