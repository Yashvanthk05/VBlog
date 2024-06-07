import '@/styles/global.css'
import Provider from '@components/Provider';
import Nav from '@components/Nav';

export const metadata={
    title:"VBLOG",
    description:"Designed by Yashvanth"
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className="main">
                <div className="gradient_top"></div>
                <div className="gradient_bottom"></div>
            </div>
            <main className='app'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
        
    </html>
  )
}

export default RootLayout