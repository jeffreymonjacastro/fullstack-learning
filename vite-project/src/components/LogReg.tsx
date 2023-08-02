import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerUser, getUsers } from '../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPenToSquare, 
  faTrash } from '@fortawesome/free-solid-svg-icons'
import '../scss/pages/logreg.scss'

interface DataObject {
  id: number, 
  name: string, 
  email: string,
  password: string,
  birthdate: Date,
  country: string,
  city: string,
  image_name: string,
  image: string
  setEdit: any
}

interface Props {
  data: DataObject;
}

// El FC es un componente funcional con un tipo específico de props
const User: React.FC<Props> = ({data}) => {

  const date = new Date(data.birthdate)
  

  const deleteUser = async (id: number) => {
    const response = ''
  }

  return (
    <section className="logreg-card">
      <div
        id = {data.id.toString()} 
        className="logreg-editbtn"
        onClick={() => data.setEdit(data)}
      >
        <FontAwesomeIcon icon = {faPenToSquare} />
      </div>
      <div
        id = {data.id.toString()} 
        className="logreg-deletebtn"
        onClick={() => deleteUser(data.id)}
      >
        <FontAwesomeIcon icon = {faTrash} />
      </div>

      <img 
        id = {data.id.toString()}
        alt = { data.image_name }
        src = {`data:image/png;base64,${data.image}`}
      />
      <div className="logreg-card__info">
        <p><b>Nombre:</b> { data.name }</p>
        <p><b>Correo:</b> { data.email }</p>
        <p><b>Contraseña:</b> { data.password }</p>
        <p><b>Fecha de Nacimiento:</b> { 
          `${date.getDate()+1}/${date.getMonth()+1}/${date.getFullYear()}` 
        }</p>
        <p><b>País:</b> { data.country }</p>
        { data.city && <p><b>Departamento:</b> { data.city }</p> }
      </div>

    </section>
  )
}


export const LogReg = () => {
  const [users, setUsers] = useState([])
  const [edit, setEdit] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    country: '',
    city: '',
    image_name: '',
    image: ''
  }) 

  console.log(edit);
  

  const {
    register, 
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)

    const response = await registerUser(
      data.name,
      data.email,
      data.password,
      data.birthdate,
      data.country,
      data.city,
      data.image[0]  
    )

    alert(response)

    callgetUsers()
    
    reset()
  })

  const ALLOWED_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif']);

  const allowedFile = (filename: string): boolean => {
    const fileExtension = filename
      .split('.')
      .pop()
      ?.toLowerCase();

    return fileExtension !== undefined && ALLOWED_EXTENSIONS.has(fileExtension);
  };

  const callgetUsers = async () => {
    const response = await getUsers()    
    setUsers(response || [])
  }

  useEffect(() => {

    callgetUsers()

    return () => {}
  }, [])

  return (
    <main className='logreg-main'>
      <a className="back" href="/">
          &#x2190; Back
        </a>
      <aside className="logreg-container">
        <h2>Register</h2>
        <div className="logreg-container__aux">
          <form 
            className='logreg-form'
            onSubmit={ onSubmit }
          >
            <label htmlFor="name">Nombre</label>
            <input 
              type="text"
              defaultValue= { edit?.name }
              id='name'
              placeholder='Nombre completo'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Nombre requerido'
                },
                minLength: {
                  value: 3,
                  message: 'Mínimo 3 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'Máximo 20 caracteres'
                },
              })}
            />
            {
              errors.name && 
              <span>{errors.name.message?.toString() }</span>
            }

            <label htmlFor="email">Correo</label>
            <input
              type="email"
              defaultValue= { edit?.email }
              id='email'
              placeholder='Correo electrónico'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Correo requerido'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Correo inválido'
                },
              })}
            />
            {
              errors.email &&
              <span>{errors.email.message?.toString()}</span>
            }

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              defaultValue= { edit?.password }
              id='password'
              placeholder='Contraseña'
              {...register('password', {
                required: {
                  value: true,
                  message: 'Contraseña requerida'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                  message: 'Debe contener al menos una mayúscula, una minúscula y un número'
                },
                minLength: {
                  value: 6,
                  message: 'Mínimo 6 caracteres'
                },
              })}
            />
            {
              errors.password &&
              <span>{errors.password.message?.toString()}</span>
            }

            <label htmlFor="confirm-password">Confirmar contraseña</label>
            <input
              type="password"
              id='confirm-password'
              placeholder='Confirmar contraseña'
              {...register('confirm-password', {
                required: {
                  value: true,
                  message: 'Confirma tu contraseña'
                },
                validate: (value: any) => {
                  return value === watch('password') || 'Las contraseñas no coinciden'
                }
              })}
            />
            {
              errors['confirm-password'] &&
              <span>{errors['confirm-password'].message?.toString()}</span>
            }

            <label htmlFor="birthdate">Fecha de Nacimiento</label>
            <input
              type="date"
              defaultValue= { edit?.birthdate }
              id='birthdate'
              {...register('birthdate', {
                required: {
                  value: true,
                  message: 'Fecha de nacimiento requerida'
                },
                validate: (value: any) => {
                  const fechaNacimiento = new Date(value)
                  const fechaActual = new Date()
                  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()

                  if (edad >= 120){
                    return 'Debes ser menor de 120 años'
                  }

                  return edad >= 18 || 'Debes ser mayor de edad'
                }
              })}
            />
            {
              errors.birthdate &&
              <span>{errors.birthdate.message?.toString()}</span>
            }

            <label htmlFor="country">País</label>
            <select 
              id="country"
              defaultValue= { edit?.country }
              {...register('country')}
            >
              <option value="mx">México</option>
              <option value="us">Estados Unidos</option>
              <option value="ca">Canadá</option>
              <option value="pe">Perú</option>
            </select>
            {
              watch('country') === 'pe' && (
                <>
                  <label htmlFor="city">Departamento</label>
                  <input 
                    type="text"
                    defaultValue= { edit?.city }
                    id='city'
                    placeholder='Departamento'
                    {...register('city', {
                      required: {
                        value: true,
                        message: 'Departamento requerido'
                      },
                    })}
                  />
                  {
                    errors.city &&
                    <span>{errors.city.message?.toString()}</span>
                  }
                </>
              )
            }

            <label htmlFor='image'>Foto de perfil</label>
            <div className="logreg-form__image">
              <label htmlFor="image">Subir foto</label>
              <p>{ edit?.image_name || watch('image')?.[0]?.name || '' }</p>
            </div>
            <input
              type="file"
              id='image'
              { ...register('image', {
                required: {
                  value: true,
                  message: 'Foto de perfil requerida'
                },
                validate: (value: any) => {
                  const filename = value[0].name

                  return allowedFile(filename) || 'Formato inválido'
                }
              })}             
            />
            {
              errors.image &&
              <span>{errors.image.message?.toString()}</span>
            }

            <div className='logreg-form__terms'>
              <label htmlFor="terms">Acepto términos y condiciones</label>
              <input
                type="checkbox"
                id='terms'
                {...register('terms', {
                  required: {
                    value: true,
                    message: 'Acepta los términos y condiciones'
                  },
                })}
              />
            </div>
            {
              errors.terms &&
              <span>{errors.terms.message?.toString()}</span>
            }

            <button type="submit">Enviar</button>

            <h3>Json data</h3>
            <pre className='logreg-json'>
              { JSON.stringify(watch(), null, 2) }
            </pre>
          </form>
        </div>
      </aside>
      <article className="logreg-users">
        <h2>Usuarios</h2>
        {
          users?.map((user: any) => {
            const data: DataObject = {
              id: user.id,
              name: user.name,
              email: user.email,
              password: user.password,
              birthdate: user.birthdate,
              country: user.country,
              city: user.city,
              image_name: user.image_name,
              image: user.image,
              setEdit: setEdit,
            };

            return <User key={user.id} data={data} />;
          })
        }
      </article>
    </main>
  )
}
