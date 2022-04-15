import React from 'react';

function InputHoraire() {

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
  };


  return (
    <div>
      <label className={'rf-label'} htmlFor={ 'nameInput' }>
        <input className="rf-input rf-mt-2v"
          name={ 'nameInput' }
          id={ 'nameInput' }
          onChange={handleChange}
          onPaste={handleChange}
        />

      </label>
    </div>
  );
}

InputHoraire.propTypes = {

};

export default InputHoraire;
