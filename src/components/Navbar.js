import React from 'react'
import '../assets/Navbar.css'
import { css } from '@emotion/react'

const navbarStyle = css({
    display: 'inline-block',
    color: 'red'
})


const Navbar = (props) => {
    return (
        <div>
            <div
                css={navbarStyle}
            >
                <h1>Pokedex</h1>
                <h1>{props.pageTitle}</h1>
            </div>
        </div>
    )
}

export default Navbar;