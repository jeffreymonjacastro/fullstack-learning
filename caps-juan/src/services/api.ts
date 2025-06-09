import axios from 'axios';
import type { Post, User } from '../interfaces/myInterfaces';

export async function fetchData(endpoint: string, id: number) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint}/${id}`);
  console.log(response.data);
}


export async function postData(post: Post, token: string | null) {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", post,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log(response)
  } catch (error) {
    console.error('Error posting data:', error);
  }
}


export async function postUser(user: User, token: string | null) {
  try {
    const response = await axios.post("http://192.168.1.1:3000/users", user,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log(response)
  } catch (error) {
    console.error('Error posting data:', error);
  }
}