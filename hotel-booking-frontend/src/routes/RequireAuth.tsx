import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default ({ user }: { user: any }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return <Outlet />
}
