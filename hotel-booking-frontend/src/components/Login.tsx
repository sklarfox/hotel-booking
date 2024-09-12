import { Label, TextInput, Checkbox, Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

export default () => {
  useNavigate()
  return (
    <main className="flex min-h-screen flex-col gap-2 p-10 dark:bg-gray-600">
      <span className="text-center text-3xl font-semibold dark:text-white">
        Welcome!
      </span>
      <span className="mb-24 text-center text-xl font-semibold dark:text-white">
        Please enter your username and password to continue.
      </span>
      <form className="flex max-w-md flex-col gap-4 self-center">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="username"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </main>
  )
}
