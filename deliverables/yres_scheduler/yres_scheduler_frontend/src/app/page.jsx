import { redirect } from 'next/navigation'

export default function Home() {
  const logged_in = true;

  if (logged_in) {
    redirect('/schedules');
  } else {
    redirect('/login');
  }
}
