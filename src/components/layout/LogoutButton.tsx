import { LogOut } from 'lucide-react'

import { Button } from '../ui/button'

export const LogoutButton = () => {
  return (
    <Button>
      <LogOut className='rotate-180' />
      Salir
    </Button>
  )
}
