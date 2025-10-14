import { Link,createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
// import axios from "axios"
import { fetchPosts } from '@/api/Api'

export const Route = createFileRoute('/posts/')({
  component: PostsRoute,
})

// async function fetchPosts() {
//   const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
//   return data
// }

function PostsRoute() {
const { data, isLoading, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
})

  if (isLoading) return <p>Loading posts...</p>
  if (isError) return <p>Error loading posts.</p>

  interface Post  {
  userId: number,
  id: number,
  title: string,
  body: string
}

  return (
    <ul className="space-y-3">
      {data.map((post: Post) => (
        <li key={post.id} className="border p-10  rounded-2xl hover:bg-blue-50">
          <Link to={`/posts/${post.id}`} className="text-black-800 list-disc font-bold hover:underline">
            {post.title }
          </Link>
          <p className="text-black-600 text-sm mt-1">{post.body}</p>
        </li>
      ))}
    </ul>
  )
}