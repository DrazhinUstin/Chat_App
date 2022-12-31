const Avatar = ({ photoURL, displayName }) => {
    return (
        <>
            {photoURL ? (
                <img className='avatar' src={photoURL} alt={displayName} />
            ) : (
                <span className='avatar'>{displayName[0].toUpperCase()}</span>
            )}
        </>
    );
};

export default Avatar;
