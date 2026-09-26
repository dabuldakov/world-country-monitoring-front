import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

import {
  enqueueRefreshJob,
  fetchAdminFeedback,
  fetchAdminVisits,
  fetchFeatureStatuses,
  fetchLastRefill,
  fetchRefreshJob,
  retryRefreshJob,
  triggerRefillAll,
  triggerRefillCountry,
} from '../rest/RestService';
import { useApplicationContext } from '../provider/CountriesProvider';

const FEATURES = ['gdp', 'debt', 'reserves', 'population'];

const FEATURE_LABELS = {
  gdp: 'featureGdp',
  debt: 'featureDebt',
  reserves: 'featureReserves',
  population: 'featurePopulation',
};

const TERMINAL_STATUSES = ['SUCCESS', 'PARTIAL', 'FAILED'];

function formatUpdatedAt(milliseconds) {
  return milliseconds ? new Date(milliseconds).toLocaleString() : '—';
}

export function AdminDashboard({ token, onLogout }) {
  const { t } = useApplicationContext();
  const [feedback, setFeedback] = useState([]);
  const [visits, setVisits] = useState(0);
  const [lastRefill, setLastRefill] = useState(null);
  const [featureStatuses, setFeatureStatuses] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [countryCode, setCountryCode] = useState('RUS');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefilling, setIsRefilling] = useState(false);
  const [error, setError] = useState('');

  const handleError = useCallback(
    (requestError) => {
      if (requestError.status === 401) {
        onLogout();
        return;
      }
      setError(requestError.message);
    },
    [onLogout],
  );

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [feedbackResult, visitsResult, refillResult, statusesResult] = await Promise.all([
        fetchAdminFeedback(token),
        fetchAdminVisits(token),
        fetchLastRefill(token),
        fetchFeatureStatuses(token),
      ]);
      setFeedback(Array.isArray(feedbackResult) ? feedbackResult : []);
      setVisits(visitsResult?.count ?? 0);
      setLastRefill(refillResult);
      setFeatureStatuses(Array.isArray(statusesResult) ? statusesResult : []);
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setIsLoading(false);
    }
  }, [handleError, token]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const activeJobId = activeJob?.id;
  const activeJobStatus = activeJob?.status;

  useEffect(() => {
    if (!activeJobId || TERMINAL_STATUSES.includes(activeJobStatus)) {
      return undefined;
    }

    const interval = setInterval(async () => {
      try {
        const job = await fetchRefreshJob(token, activeJobId);
        setActiveJob(job);
        if (TERMINAL_STATUSES.includes(job.status)) {
          await loadDashboard();
        }
      } catch (requestError) {
        handleError(requestError);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeJobId, activeJobStatus, handleError, loadDashboard, token]);

  const runRefill = async (action) => {
    setIsRefilling(true);
    setError('');

    try {
      const result = await action();
      setLastRefill(result);
      await loadDashboard();
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setIsRefilling(false);
    }
  };

  const enqueueAndTrack = async (feature, code) => {
    setIsRefilling(true);
    setError('');

    try {
      const job = await enqueueRefreshJob(token, feature, code);
      setActiveJob(job);
      await loadDashboard();
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setIsRefilling(false);
    }
  };

  const retryActiveJob = async () => {
    if (!activeJobId) {
      return;
    }

    setIsRefilling(true);
    setError('');

    try {
      const job = await retryRefreshJob(token, activeJobId);
      setActiveJob(job);
      await loadDashboard();
    } catch (requestError) {
      handleError(requestError);
    } finally {
      setIsRefilling(false);
    }
  };

  const statusByFeature = (feature) =>
    featureStatuses.find((item) => item.feature === feature);

  const progress = activeJob?.total
    ? Math.round((activeJob.processed * 100) / activeJob.total)
    : 0;

  return (
    <div>
      <div className="admin-toolbar">
        <h3>{t('adminPanel')}</h3>
        <Button variant="outlined" size="small" onClick={onLogout}>{t('logout')}</Button>
      </div>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <div><strong>{t('visits')}:</strong> {visits}</div>
        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            disabled={isRefilling}
            onClick={() => runRefill(() => triggerRefillAll(token))}
          >
            {t('refillAll')}
          </Button>
          <TextField
            label={t('countryCode')}
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value.toUpperCase())}
            size="small"
            sx={{ mx: 1, width: 140 }}
          />
          <Button
            variant="outlined"
            disabled={isRefilling}
            onClick={() => runRefill(() => triggerRefillCountry(token, countryCode))}
          >
            {t('refillCountry')}
          </Button>
        </div>
      </Paper>

      {activeJob && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <h4>{t('refreshJob')} #{activeJob.id}</h4>
          <div>{t('status')}: {activeJob.status}</div>
          <div>{t('processed')}: {activeJob.processed}/{activeJob.total}</div>
          <LinearProgress variant="determinate" value={progress} sx={{ my: 1 }} />
          {activeJob.failed > 0 && (
            <div>
              <div>{t('failedCountries')}: {activeJob.failed}</div>
              <Button size="small" disabled={isRefilling} onClick={retryActiveJob}>
                {t('retryFailed')}
              </Button>
            </div>
          )}
        </Paper>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <h4>{t('updateByFeature')}</h4>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('operation')}</TableCell>
              <TableCell>{t('lastUpdated')}</TableCell>
              <TableCell>{t('status')}</TableCell>
              <TableCell align="right">{t('refresh')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FEATURES.map((feature) => {
              const status = statusByFeature(feature);
              return (
                <TableRow key={feature}>
                  <TableCell>{t(FEATURE_LABELS[feature])}</TableCell>
                  <TableCell>{formatUpdatedAt(status?.lastUpdatedAtEpochMillis)}</TableCell>
                  <TableCell>{status?.status || '—'}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      disabled={isRefilling}
                      onClick={() => enqueueAndTrack(feature, null)}
                    >
                      {t('refreshAll')}
                    </Button>
                    <Button
                      size="small"
                      disabled={isRefilling}
                      onClick={() => enqueueAndTrack(feature, countryCode)}
                    >
                      {t('refreshCountry')}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <h4>{t('lastRefill')}</h4>
        {lastRefill ? (
          <div>
            <div>{t('status')}: {lastRefill.status}</div>
            <div>{t('operation')}: {lastRefill.operation}</div>
            <div>{t('processed')}: {lastRefill.processedCount}</div>
            <div>{t('started')}: {lastRefill.startedAt}</div>
            <div>{t('finished')}: {lastRefill.finishedAt}</div>
            {lastRefill.errorMessage && <div>{t('error')}: {lastRefill.errorMessage}</div>}
          </div>
        ) : (
          <div>{t('noRefillResult')}</div>
        )}
      </Paper>

      <Paper sx={{ p: 2 }}>
        <h4>{t('feedbackList')}</h4>
        {isLoading ? (
          <CircularProgress size={24} />
        ) : feedback.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('feedbackEmail')}</TableCell>
                <TableCell>{t('feedbackMessage')}</TableCell>
                <TableCell>{t('createdAt')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>{t('noFeedback')}</div>
        )}
      </Paper>
    </div>
  );
}
