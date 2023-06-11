import React, { useState, useCallback } from 'react';
import './style.css';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [jobTitleErr, setJobTitleErr] = useState('');

  const validate = useCallback(() => {
    // Validate name
    let error = false;
    if (name === '') {
      setNameErr('Please enter your name');
      error = true;
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(name) === false) {
        setNameErr('Please enter a valid name');
        error = true;
      } else {
        setNameErr('');
        error = false;
      }
    }

    // Validate email address
    error = true;
    if (email == '') {
      setEmailErr('Please enter your email address');
      error = true;
    } else {
      // Regular expression for basic email validation
      var regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
        setEmailErr('Please enter a valid email address');
        error = true;
      } else {
        setEmailErr('');
        error = false;
      }
    }

    // Validate email address
    error = true;
    if (jobTitle == '') {
      setJobTitleErr('Please enter your job title');
      error = true;
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(jobTitle) === false) {
        setJobTitleErr('Please enter a valid job title');
        error = true;
      } else {
        setJobTitleErr('');
        error = false;
      }
    }

    return error;
  }, [name, email, jobTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isError = validate();
    if (!isError) {
      fetch(
        'https://bqaabme9m0.execute-api.us-east-1.amazonaws.com/default/saveUserData',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            jobTitle,
          }),
          headers: {
            'x-api-key': 'Yccc6FpMCe7wf9wrJcRNY1WmbbthsyvD5yt144Hs',
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
  };
  return (
    <div>
      <h1>White Paper</h1>
      <p>Please enter below details to download white paper</p>
      <form onSubmit={handleSubmit} autocomplete="off">
        <div className="formInput">
          <span className="label">
            <label>Name</label> <span className="error">{nameErr}</span>
          </span>
          <input
            type="Name"
            name="name"
            value={name}
            placeholder="Enter your name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formInput">
          <span className="label">
            <label>Email</label> <span className="error">{emailErr}</span>
          </span>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formInput">
          <span className="label">
            <label>job title</label>{' '}
            <span className="error">{jobTitleErr}</span>
          </span>
          <input
            type="text"
            name="jobTitle"
            value={jobTitle}
            placeholder="Enter a Job Title..."
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
