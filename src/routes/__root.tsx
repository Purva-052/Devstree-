import { Link ,Outlet, createRootRoute} from '@tanstack/react-router'


export const Route = createRootRoute({
  component: () => (
    <div className="max-w-4xl mx-auto p-4">
      <nav className="mb-6 flex gap-4 border-b pb-2">
        <Link to="/posts" className="[&.active]:font-bold">
          Posts
        </Link>
      </nav>
      <Outlet />
    </div>
  ),
})
