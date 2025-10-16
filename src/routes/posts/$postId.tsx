import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchComments, fetchPost } from '@/api/Api'

// import axios from 'axios';

// Create the route
export const Route = createFileRoute('/posts/$postId')({
  component: PostDetailsRoute,
})

// Fetch single post
// async function fetchPost(id: string) {
//   const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
//   return data;
// }

// Fetch all comments for a post
// async function fetchComments(postId: string) {
//   const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
//   return data;
// }
interface Comments {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
function PostDetailsRoute() {
  const { postId } = useParams({ from: '/posts/$postId' })

  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  })

  const commentsQuery = useQuery<Array<Comments>>({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  })

  if (postQuery.isLoading) return <p className='text-white'>Loading post...</p>
  if (postQuery.isError) return <p className='text-white'>Error loading post.</p>

  if (commentsQuery.isLoading) return <p className='text-white'>Loading comments...</p>
  if (commentsQuery.isError) return <p className='text-white'>Error loading comments.</p>

  const post = postQuery.data
  const comments = commentsQuery.data

  return (
    <div>
      <Link
        to="/posts"
        className="inline-block px-3 py-2  text-white rounded hover:bg-blue-200 transition border-1"
      >
        ← Back to Posts
      </Link>
      <h1 className='font-bold text-2xl text-white p-5 '>Id:{post.id}</h1>
      <h1 className="text-2xl font-bold mt-4 mb-2  text-white">{post.title}</h1>
      <p className="text-black-700 mb-6  text-white">{post.body}</p>

      <h2 className="text-xl font-semibold mb-3  text-white">Comments</h2>

      <ul className="space-y-3">
        {comments?.map((comment: Comments) => (
          <li key={comment.id} className="border rounded-3xl p-7  text-white">
            <p className="font-semibold text-black-500">{comment.name}</p>
            <p className="text-sm text-black-500">{comment.email}</p>
            <p className="mt-2 text-black-700">{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
