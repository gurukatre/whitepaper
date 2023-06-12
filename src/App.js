import React, { useState, useCallback, useEffect } from 'react';
import './style.css';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [jobTitleErr, setJobTitleErr] = useState('');
  const [formSubmited, setFormSubmited] = useState(false);
  const [enableDownload, setEnableDownload] = useState(false);

  const [, id] = location.search.split('=');
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
        'https://2750liadfi.execute-api.eu-north-1.amazonaws.com/default/whitepapers',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            jobTitle,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            setFormSubmited(true);
          }
        });
    }
  };

  useEffect(() => {
    fetch(
      `https://2750liadfi.execute-api.eu-north-1.amazonaws.com/default/whitepapers?id=${id}`,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEnableDownload(true);
        }
      });
  }, [id]);

  if (id) {
    return (
      <div>
        <h1>White Paper</h1>
        {!enableDownload ? (
          <p> wait...</p>
        ) : (
          <>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="http://downloadwp.s3-website.eu-north-1.amazonaws.com/white-paper-template1.pdf"
                >
                  Download white paper on finance
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="http://downloadwp.s3-website.eu-north-1.amazonaws.com/white-paper-template2.pdf"
                >
                  Download white paper on AI
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
    );
  }

  if (formSubmited) {
    return (
      <div>
        <h1>White Paper</h1>
        <p> Please verify email to download white paper.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>White Paper</h1>
      <p>Please enter below details to download white paper</p>
      <form onSubmit={handleSubmit} autocomplete="off">
        <div className="formInput">
          <div className="label">
            <label>Name</label> <span className="error">{nameErr}</span>
          </div>
          <input
            type="Name"
            name="name"
            value={name}
            placeholder="Enter your name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formInput">
          <div className="label">
            <label>Email</label> <span className="error">{emailErr}</span>
          </div>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formInput">
          <div className="label">
            <label>job title</label>{' '}
            <span className="error">{jobTitleErr}</span>
          </div>
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
