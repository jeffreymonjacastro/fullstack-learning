const BACKEND_URL = 'http://localhost:5000'

// Image Upload
export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const res = await fetch(`${BACKEND_URL}/image/upload`, {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  
  const data = await res.json()
  return data
}
