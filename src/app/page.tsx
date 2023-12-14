import { db } from '@/db'
export default function Home() {
  console.log(db);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        This is final prep
      </h1>
    </main>
  )
}
