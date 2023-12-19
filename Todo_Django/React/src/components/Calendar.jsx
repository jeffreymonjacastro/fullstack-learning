import React from 'react'
import '../css/Calendar.css'

export const Calendar = () => {
  const form = document.getElementById('forms')
  // let csrfToken = form.getElementsByTagName('input')[0].value
  // console.log('NewToken:', csrfToken);

  return (
    <article className='calendar'>
      <form action="" method="post" id='forms'>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </form>
    </article>
  )
}
