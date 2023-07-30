const BACKEND_URL = 'http://192.168.0.220:5000'

// Image Upload
/* This function connects to the localhost to upload an image
  * @param {File} file - The file to be uploaded
  * @returns {Blob} - The image uploaded in type Blob (Binary)  
*/
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

// Get Images
/* This function connects to the localhost to get all the images uploaded. 
  * @returns {Array} - An array of images in type base64 (Binary)
*/
export const getImages = async () => {
  const res = await fetch(`${BACKEND_URL}/image/upload`)
  const data = await res.json()
  return data
}

// Cat Facts API
/* This function connects to the Cat Facts API to get a random cat fact.
  * @returns {Object} - An object containing the cat fact
*/
export const getCatFact = async () => {
  const res = await fetch('https://cat-fact.herokuapp.com/facts/random/?animal_type=cat&amount=1')
  const data = await res.json()
  return data
}

// Rick and Morty API
/* This function connects to the Rick and Morty API to get a random character.
  * @returns {Object} - An object containing the character
*/
export const getRickAndMortyCharacter = async (id: number) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}}`)
  const data = await res.json()
  return data
}


// https://dog.ceo/api/breeds/image/random Fetch!
