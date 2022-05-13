import React, {ChangeEventHandler} from 'react';

interface IFormInput {
    id: string,
    labelText: string,
    value?: string,
    type?: string,
    handleChange: ChangeEventHandler<HTMLElement>,
}

const FormInput: React.FC<IFormInput> = ({
                                             id,
                                             labelText,
                                             type = 'text',
                                             value,
                                             handleChange,
                                         }) => {
    return (
        <div className='default__input'>
            <label htmlFor={id}
                   className='default__input-label'
            >
                {labelText}
            </label>
            <input type={type}
                   id={id}
                   name={id}
                   value={value}
                   onChange={handleChange}
            />
        </div>
    );
};

export default FormInput;
