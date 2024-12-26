'use client';

import { signOut } from 'next-auth/react';

import { LogOut } from 'lucide-react';

import { Button } from '../ui/button';

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <Button onClick={handleLogout}>
      <LogOut className='rotate-180' />
      Salir
    </Button>
  )
}
