import React from 'react'

export const LinkCard = ({ link }) => {
  return (
    <>
      <h3>Link</h3>
      <p>
        Your link:{' '}
        <a href={link.to} target='_black' rel='noopener noreferrer'>
          {link.to}
        </a>
      </p>
      <p>
        From:{' '}
        <a href={link.from} target='_black' rel='noopener noreferrer'>
          {link.from}
        </a>
      </p>
      <p>
        Clicked: <strong>{link.clicks}</strong>
      </p>
      <p>
        Date: <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  )
}
