import React from 'react'

const pwIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="white" d="M2 19v-2h20v2H2Zm1.15-6.05l-1.3-.75l.85-1.5H1V9.2h1.7l-.85-1.45L3.15 7L4 8.45L4.85 7l1.3.75L5.3 9.2H7v1.5H5.3l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Zm8 0l-1.3-.75l.85-1.5H9V9.2h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H15v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Zm8 0l-1.3-.75l.85-1.5H17V9.2h1.7l-.85-1.45l1.3-.75l.85 1.45l.85-1.45l1.3.75l-.85 1.45H23v1.5h-1.7l.85 1.5l-1.3.75l-.85-1.5l-.85 1.5Z"/></svg>
)


const Header = (props) => {
  

    return (
        <div className='header'>
            <a href="/password-generator/"><h1>Chess</h1></a>
            {/* <nav>
            <a href="/password-generator/info/">Info</a>
            </nav> */}
        </div>
    )
}

export default Header