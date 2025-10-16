import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center  text-center space-y-6">

      <Link
        to="/posts"
        className="px-3 py-3 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        View Posts 
      </Link>
    </div>
  )
}
