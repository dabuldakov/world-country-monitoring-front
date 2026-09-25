import { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { submitFeedback } from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

export function FeedbackButton() {
  const { t } = useApplicationContext();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      await submitFeedback({ email, message });
      setStatus('sent');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus('idle');
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setIsOpen(true)}>
        {t('leaveFeedback')}
      </Button>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{t('leaveFeedback')}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {status === 'sent' && <Alert severity="success" sx={{ mb: 2 }}>{t('feedbackSent')}</Alert>}
            {status === 'error' && <Alert severity="error" sx={{ mb: 2 }}>{t('feedbackError')}</Alert>}
            <TextField
              label={t('feedbackEmail')}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label={t('feedbackMessage')}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              fullWidth
              required
              multiline
              minRows={4}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('close')}</Button>
            <Button type="submit" variant="contained" disabled={status === 'sending'}>
              {t('feedbackSend')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
