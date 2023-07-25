import '../scss/pages/imageup.scss'

export const ImageUpload = () => {

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwzjh0asp/image/upload'
  const CLOUDINARY_UPLOAD_PRESET = 'llekbdwp'


  const imgUploader = async (e: any) => {
    const file = e.target.files[0].name

    // This formData will be sent to the server
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    // Send the formData to the server
    const res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
      headers: { 'content-type': 'multipart/form-data' }
    })
    
    console.log(res);
    
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
