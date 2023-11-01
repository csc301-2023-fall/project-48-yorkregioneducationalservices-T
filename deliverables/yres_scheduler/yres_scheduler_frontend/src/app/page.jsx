import { redirect } from 'next/navigation'

export default function Home() {
  const logged_in = false;

  if (logged_in) {
    redirect('/schedules');
  } else {
    redirect('/login');
  }
}
