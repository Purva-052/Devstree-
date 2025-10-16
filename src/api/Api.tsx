import axios from 'axios';

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts=async () => {
  const { data } = await api.get(`/posts`)
  return data
}

export const fetchPost=async(id: string)=> {
  const { data } = await api.get(`/posts/${id}`);
  return data;
}

export const fetchComments= async(postId: string) =>{
  const { data } = await api.get(`/posts/${postId}/comments`);
  return data;
}