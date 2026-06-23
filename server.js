const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.options('*', cors({ origin: '*' }));

app.get('/campaigns', async (req, res) => {
  try {
    const token = req.query.token || process.env.META_ACCESS_TOKEN;
    const accountId = req.query.account_id || process.env.META_AD_ACCOUNT_ID;

    if (!token || !accountId) {
      return res.status(400).json({ error: 'token e account_id sono obbligatori' });
    }

    const response = await fetch(
      `https://graph.facebook.com/v25.0/${accountId}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,start_time,stop_time&access_token=${token}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Meta Ads API nuova versione',
    routes: ['/campaigns']
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
