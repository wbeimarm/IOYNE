import React from "react";
import '../../vistas/assets/styles.css'

const Base = ({ children, ...rest }) => {
    return (
        <div {...rest}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Base;