const FormField = ({ type, name, value, onChange, required, label }) => {
    return (
        <div className='form-field'>
            <label htmlFor={name}>{label || name}:</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default FormField;
