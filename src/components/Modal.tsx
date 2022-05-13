import React from 'react';
import cn from "classnames";

import Close from '../assets/delete.png'

interface IModal {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    title?: string,
    children?: React.ReactNode
}

const Modal: React.FC<IModal> = ({
                                     active,
                                     setActive,
                                     title,
                                     children
                                 }) => {
    return (
        <div className={cn('modal', {['active']: active})}
             onClick={() => setActive(false)}>
            <div className={'modal_content'}
                 onClick={e => e.stopPropagation()}>

                <div className={'modal_header'}>
                    <h2>{title}</h2>
                    <span className={'close'}
                          onClick={() => setActive(false)}>
                        <img src={Close} alt=""/>
                    </span>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;
