import { Routes, Route } from 'react-router-dom'

// styles
import './globals.css'

// Layouts
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'

// components
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Toaster } from "@/components/ui/toaster"

// Pages
/* This is named import due to index.ts in _root/pages */
import { AllUsers, CreatePost, EditPost, Explore, Home, Profile, Saved, UpdateProfile } from './_root/pages'

const App = () => {
  return (
    <>
      <main className='flex h-screen'>
        <Routes>
          {/* public routes visible for everyone */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>

          {/* private routes visible on after signing in*/}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:id' element={<EditPost />} />
            <Route path='/posts/:id/*' element={<Profile />} />
            <Route path='/update-profile/:id' element={<UpdateProfile />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </>
  )
}

export default App