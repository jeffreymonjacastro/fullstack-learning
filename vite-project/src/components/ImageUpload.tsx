import '../scss/pages/imageup.scss'
import { uploadImage } from '../services/api'

export const ImageUpload = () => {

  const imgUploader = async (e: any) => {
    const file = e.target.files[0]

    try {
      const response = await uploadImage(file)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="imageup-main">
      <section className="imageup-container">
        <img alt="holi" id="img-preview" />

        <div className="imageup-footer">
          <input 
            type="file" 
            id="img-uploader"
            onChange={(e) => { imgUploader(e) }}
          />
          
        </div>
      </section>
    </main>
  )
}
