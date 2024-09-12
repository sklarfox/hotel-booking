import { Label, TextInput, Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<string | null>>
  setAlert: React.Dispatch<React.SetStateAction<string>>
}

export default ({ setUser, setAlert }: LoginProps) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserLogin = async (e: any) => {
    e.preventDefault()
    const encodedCredentials = btoa(`${username}:${password}`)
    const response = await fetch(`${import.meta.env.VITE_API_URL}rooms`, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    })

    if (response.ok) {
      setUser(encodedCredentials)
      navigate('/book')
      setAlert('')
    } else {
      setAlert('Invalid username or password')
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-2 p-10 dark:bg-gray-600">
      <span className="text-center text-3xl font-semibold dark:text-white">
        Welcome!
      </span>
      <span className="mb-24 text-center text-xl font-semibold dark:text-white">
        Please enter your username and password to continue.
      </span>
      <form
        className="flex max-w-md flex-col gap-4 self-center"
        onSubmit={handleUserLogin}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </main>
  )
}
