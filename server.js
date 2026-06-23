const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.options('*', cors({ origin: '*' }));
app.use(express.json());

app.get('/campaigns', async (req, res) => {
  try {
    const token = process.env.META_ACCESS_TOKEN;
    const accountId = process.env.META_AD_ACCOUNT_ID;
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
  res.json({ message: 'Meta Ads API', routes: ['/campaigns'] });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
