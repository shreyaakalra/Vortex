1) Neon connection latency ~1.5-2s per request even with pgbouncer, needs investigation — possibly try direct (non-pooled) connection, check region, or consider connection warm-up.

2) Rate limiting on /api/sign-in (and /api/sign-up)