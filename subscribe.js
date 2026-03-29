exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email invalide' }) };
  }

  const res = await fetch('https://api.systeme.io/api/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.SYSTEME_API_KEY
    },
    body: JSON.stringify({
      email: email,
      fields: [],
      tags: [{ name: 'cookimag-waitlist' }]
    })
  });

  if (!res.ok) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur API' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
