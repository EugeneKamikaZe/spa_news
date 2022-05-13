import React from 'react';
import cn from "classnames";

export interface ButtonProps {
    buttonText: string,
    className?: string | undefined,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit",
    isDisabled?: boolean
}

const Button: React.FC<ButtonProps>
    = ({
           buttonText,
           className = 'btn-primary',
           onClick,
           type = 'button',
           isDisabled = false
       }) => {
    return (
        <button className={cn('btn', className)}
                type={type}
                onClick={onClick}
                disabled={isDisabled}
        >
            {buttonText}
        </button>
    )
}

export default Button
