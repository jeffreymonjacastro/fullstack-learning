import { useState } from 'react'
import { uploadImage } from '../services/api'
import '../scss/pages/imageup.scss'

export const ImageUpload = () => {
  const [url_img, setUrl_img] = useState('')

  const imgUploader = async (e: any) => {
    const file = e.target.files[0]

    const response = await uploadImage(file)
    
    console.log(response)
    
    // setUrl_img(URL.createObjectURL(response))
  }

  return (
    <main className="imageup-main">
      <h2>Image Upload</h2>

      <aside className="imageup-container">
        <section className='imageup-upload'>
          <img src={url_img} alt="holi" id="img-preview" />

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


        </section>
      </aside>
    </main>
  )
}
