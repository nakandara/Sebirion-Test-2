import React, { useState } from 'react';
import './user.css';
import { TextField,Slider } from '@material-ui/core';
import PageHeader from '../Application/Fndfw/PageHeader/PageHeader';

export default function User() {

  const defaultValues = {
    name: "",
    age: 0,
    sex: "",
    os: "",
    favoriteNumber: 0,
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className='user'>
      <PageHeader title="User"/>
      <form>
        <TextField
          id="name-input"
          name="name"
          label="Name"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <TextField
          id="age-input"
          name="age"
          label="Age"
          type="number"
          value={formValues.age}
          onChange={handleInputChange}
        />
        <div style={{ width: "400px" }}>
          Favorite Number
          <Slider
            value={formValues.favoriteNumber}
            onChange={handleSliderChange("favoriteNumber")}
            defaultValue={1}
            step={1}
            min={1}
            max={3}
            marks={[
              {
                value: 1,
                label: "1",
              },
              {
                value: 2,
                label: "2",
              },
              {
                value: 3,
                label: "3",
              },
            ]}
            valueLabelDisplay="off"
          />
        </div>
      </form>
    </div>
  )
}
