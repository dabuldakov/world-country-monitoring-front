import { useApplicationContext } from '../provider/CountriesProvider';

export function EconomicButton({ activeGroup, setActiveGroup }) {
  const { t } = useApplicationContext();

  return (
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
        {t('economic')}
      </button>
    </div>
  );
}

export function SocialButton({ activeGroup, setActiveGroup }) {
  const { t } = useApplicationContext();

  return (
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
        {t('social')}
      </button>
    </div>
  );
}
