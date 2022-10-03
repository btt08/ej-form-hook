import { useForm } from 'react-hook-form';
import './Form.css';

export default function Form() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const sub = (data) => console.log('Datos formulario', data);

  const checkAge = (age) => age >= 18 && age <= 65;
  const hasCode = watch('checkPromoCode');

  return (
    <>
      <h2>Formulario con Hooks</h2>
      <p>Nombre de usuario: #354-{watch('name')}</p>
      <form className='myForm' onSubmit={handleSubmit(sub)}>
        <label htmlFor="name">Nombre</label>
        <input type="text" id='name' autoFocus {...register('name', {
          required: true,
          maxLength: 16
        })} />

        {errors.name?.type === 'required' && <p className='error'>El nombre es necesario</p>}
        {errors.name?.type === 'maxLength' && <p className='error'>El nombre debe tener menos de 16 caracteres</p>}


        <label htmlFor="age">Edad</label>
        <input type="text" {...register('age', {
          validate: checkAge
        })} id='age' />

        {errors.age && <p className='error'>La edad debe estar entre 18 y 65 inclusive</p>}

        <label htmlFor="mail">Email</label>
        <input type="text" {...register('mail', {
          pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        })} id='mail' />

        {errors.mail?.type === 'pattern' && <p className='error'>El email no es valido</p>}

        <div className='checkPromoCode'>
          <label htmlFor="checkPromoCode">¿Código propmocional?</label>
          <input type="checkbox" {...register('checkPromoCode')} id='checkPromoCode' />
        </div>
        {hasCode && <input type="text" {...register('promotionalCode')} id='promotionalCode' />}

        <input type="submit" value="Enviar" />
      </form>
    </>
  )
}
