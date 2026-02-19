exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method not allowed' }) };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Missing RESEND_API_KEY or FROM_EMAIL env vars.' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const subjectName = payload.company || payload.respondent || 'New Submission';

    const lines = [];
    lines.push('AI Maturity Self-Assessment Submission');
    lines.push('====================================');
    lines.push('');
    lines.push(`Respondent: ${payload.respondent || 'Not provided'}`);
    lines.push(`Company: ${payload.company || 'Not provided'}`);
    lines.push('');
    lines.push(`Rated Use Cases: ${payload.summary?.rated ?? 0}/${payload.summary?.total ?? 0}`);
    lines.push(`Average Score: ${payload.summary?.average ?? '0.0'}`);
    lines.push('');

    Object.entries(payload.ratings || {}).forEach(([functionName, entries]) => {
      lines.push(functionName);
      lines.push('-'.repeat(functionName.length));
      entries.forEach(({ useCase, score }) => {
        lines.push(`- ${useCase}: ${score === null ? 'Not rated' : score}`);
      });
      lines.push('');
    });

    if (payload.notes) {
      lines.push('Notes');
      lines.push('-----');
      lines.push(payload.notes);
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ['brandon@korza.com'],
        subject: `AI Maturity Assessment - ${subjectName}`,
        text: lines.join('\n'),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { statusCode: 502, body: JSON.stringify({ message: errorText }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: 'Submitted successfully' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
  }
};
