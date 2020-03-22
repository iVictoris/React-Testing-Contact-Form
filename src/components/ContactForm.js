import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const [data, setData] = useState();
  const [numClicks, setNumClicks] = useState(0);
  const { register, errors, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = data => {
    setData(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            data-testid="first-name-input"
            name="firstName"
            placeholder="bill"
            ref={register({ required: true, maxLength: 3 })}
          />
          {errors.firstName && (
            <p data-testid="error">{`Looks like there was an error: ${errors.firstName.type}`}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            data-testid="last-name-input"
            name="lastName"
            placeholder="luo"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p data-testid="error">{`Looks like there was an error: ${errors.lastName.type}`}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input
            data-testid="error"
            id="email"
            name="email"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p data-testid="email-error">{`Looks like there was an error: ${errors.email.type}`}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" ref={register({ required: false })} />
        </div>
        {data && (
          <pre style={{ textAlign: 'left', color: 'white' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <button
          data-testid="clicks"
          onClick={e => {
            e.preventDefault();
            setNumClicks(numClicks + 1);
          }}>
          click me: {numClicks}
        </button>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
