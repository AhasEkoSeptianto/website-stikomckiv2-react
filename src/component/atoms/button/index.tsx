import react from 'react'

type IButton = {
    onClick?: any
    text: any
}

const ButtonMy = (props:IButton) => {
    const { onClick, text } = props

    return (
        <button onClick={onClick}>{text}</button>
    )
}

export default ButtonMy