
export function EconomicButton({ activeGroup, setActiveGroup }) {

    return(
        <div>
            <button
            style={{
                padding: '6px 16px',
                background: activeGroup === 'economic' ? '#1976d2' : '#e0e0e0',
                color: activeGroup === 'economic' ? '#fff' : '#333',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 500,
            }}
            onClick={() => setActiveGroup('economic')}
            >
            Economic
            </button>
        </div>
    );
}

export function SocialButton({ activeGroup, setActiveGroup }) {

    return(
        <div>
            <button
            style={{
                padding: '6px 16px',
                background: activeGroup === 'social' ? '#1976d2' : '#e0e0e0',
                color: activeGroup === 'social' ? '#fff' : '#333',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 500,
            }}
            onClick={() => setActiveGroup('social')}
            >
            Social
            </button>
        </div>
    );
}