import React from 'react'
import {FiAlertCircle} from 'react-icons/fi'

const Alert = (props) => {
 
 
  return (
    <div className='alert'
        style={{
            width:"fit-content",
            height:"10vh",
            background:"black",
            borderRadius:"10px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            padding:"5px 15px",
            position:"absolute",
            top:"20px",
            right:"20px",
            zIndex:40,
          

        }}
    >
        
      <FiAlertCircle />-{props.msg}
    </div>
  )
}

export default Alert