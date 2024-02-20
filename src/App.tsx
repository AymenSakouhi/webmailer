import Mailer from './components/Mailer'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  console.log(import.meta.env.VITE_CLIENT_ID)
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse)
        }}
        onError={() => {
          console.log('Login Failed')
        }}
        useOneTap
      />
      <div className="w-screen h-screen bg-slate-600">
        <header className="flex items-center justify-center h-20 text-white bg-slate-700">
          <h1 className="text-2xl">WebMai-L@L-er</h1>
        </header>
        {/* <Login /> */}
        <Mailer />
        <footer className="flex flex-col items-center justify-center h-20 text-white bg-slate-700">
          <p>© 2024 WebMai-L@L-er</p>
          <div>
            <img
              src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
              alt="Buy Me A Coffee to say thanks"
              className="h-8"
            ></img>
          </div>
        </footer>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
