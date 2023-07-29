const BACKEND_URL = 'http://localhost:5000'

// Image Upload
export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const res = await fetch(`${BACKEND_URL}/image/upload`, {
    method: 'POST',
    body: formData
  })
  
  const data = await res.blob()
  return data
  
  
}
