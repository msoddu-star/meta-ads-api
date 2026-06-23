const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/campaigns', async (req, res) => {
  try {
    const token = process.env.META_ACCESS_TOKEN;
    const accountId = process.env.META_AD_ACCOUNT_ID;

    const response = await fetch(
      `https://graph.facebook.com/v25.0/${accountId}/campaigns?fields=id,name,status,objective&access_token=${token}`
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
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
