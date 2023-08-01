import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerUser, getUsers } from '../services/api'
import '../scss/pages/logreg.scss'

const User = () => {
  return (
    <section className="logreg-card">
      <img src="https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" alt="gatito" />
      <div className="logreg-card__info">
        <p><b>Nombre:</b> aaaaaaaaaaaaaaaaaaaa</p>
        <p><b>Correo:</b> aaaaaaaaaaaaaaaaaaaaaa</p>
        <p><b>Contraseña:</b> aaaaaaaaaaaaaaaaaaaa</p>
        <p><b>Fecha de Nacimiento:</b> 07/01/2023</p>
        <p><b>País:</b> aaaaaaaaaaaaaaaaaaaa</p>
      </div>

    </section>
  )
}


export const LogReg = () => {
  
  const {
    register, 
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

    console.log(response);
    
    // reset()
  })

  const ALLOWED_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif']);

  const allowedFile = (filename: string): boolean => {
    const fileExtension = filename
      .split('.')
      .pop()
      ?.toLowerCase();

    return fileExtension !== undefined && ALLOWED_EXTENSIONS.has(fileExtension);
  };

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
              <p>{ watch('image')?.[0]?.name || '' }</p>
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

        <User />
        <User />
      </article>
    </main>
  )
}
