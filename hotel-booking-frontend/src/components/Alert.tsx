import { Alert } from 'flowbite-react'

export const AlertBar = ({ alert }: { alert: string }) => {
  if (alert.includes('confirmed')) {
    return (
      <Alert color="success" rounded>
        <span className="font-medium">Success!</span> {alert}
      </Alert>
    )
  } else {
    return (
      <Alert color="warning" rounded>
        <span className="font-medium">Alert!</span> {alert}
      </Alert>
    )
  }
}
