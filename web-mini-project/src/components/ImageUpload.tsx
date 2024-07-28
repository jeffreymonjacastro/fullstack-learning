import { useEffect, useState } from 'react'
import { uploadImage, getImages } from '../services/api'
import '../scss/pages/imageup.scss'

const Image = (
  {id, name, url}: 
  { id: number, 
    name: string, 
    url: string}) => {

  return (
    <div className="imageup-historial__item">
      <img 
        id={id.toString()} 
        src={`data:image/png;base64,${url}`} 
        alt={name} />
      <p>{name}</p>
    </div>
  )
}


export const ImageUpload = () => {
  const [url_img, setUrl_img] = useState('')
  const [imageName, setImageName] = useState('')
  const [images, setImages] = useState([])

  const imgUploader = async (e: any) => {
    const file = e.target.files[0]

    setImageName(file.name)

    const response = await uploadImage(file)
    
    setUrl_img(URL.createObjectURL(response))
  }

  const callgetImages = async () => {
    const response = await getImages()
    setImages(response || [])
  }

  useEffect(() => {
    callgetImages()

    return () => {}
  }, [url_img])

  return (
    <main className="imageup-main">
      <a className="back" href="/">
        &#x2190; Back
      </a>
      
      <aside className="imageup-container">
      <h2>Image Upload</h2>
        <section className='imageup-upload'>
          {url_img && <img src={url_img} alt="holi" id="img-preview" />}
          <p>{imageName}</p>

          <div className="imageup-footer">
            <label 
              htmlFor="img-uploader"
              className="imageup-footer__btn"
            >Upload Image</label>
            <input 
              type="file" 
              id="img-uploader"
              onChange={(e) => { imgUploader(e) }}
            />
          </div>
        </section>

        <section className='imageup-historial'>
          <h3>Image Preview</h3>

          { images?.map((image: any) => (
            <Image 
              key={image.id} 
              id={image.id}
              name={image.name}
              url={image.base64_image}
            />
          ))}
        </section>
      </aside>
    </main>
  )
}
