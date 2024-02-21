import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agifyResponse = await axios.get(`https://api.agify.io?name=${name}`);
      const genderizeResponse = await axios.get(`https://api.genderize.io?name=${name}`);
      const nationalizeResponse = await axios.get(`https://api.nationalize.io?name=${name}`);

      setAge(agifyResponse.data.age);
      setGender(genderizeResponse.data.gender);
      if (nationalizeResponse.data.country.length > 0) {
        setCountry(nationalizeResponse.data.country[0].country_id);
      } else {
        setCountry('Unknown');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Guess Age, Gender, and Country</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            className={styles.input}
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div>
          {age && <p>Age: {age}</p>}
          {gender && <p>Gender: {gender}</p>}
          {country && <p>Country: {country}</p>}
        </div>
      </div>
    </div>
  );
}
