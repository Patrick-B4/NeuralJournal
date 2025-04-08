'use client';

import { useState } from 'react';

export default function GenerateSummary({ entryHtml }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripHtmlTags = (str) => str.replace(/<\/?[^>]+(>|$)/g, '');

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    const plainText = stripHtmlTags(entryHtml);

    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryText: plainText }),
      });

      const data = await res.json();

      if (res.ok) {
        setSummary(data.summary);
      } else {
        setError('Failed to summarize.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-6'>
      <button
        onClick={handleClick}
        disabled={loading}
        className='rounded-full bg-violet-600 text-white px-6 py-2 hover:bg-violet-700 transition'
      >
        {loading ? 'Summarizing...' : 'Generate Summary'}
      </button>

      {summary && (
        <div className='mt-4'>
          <h2 className='text-violet-500 text-2xl font-semibold mb-2'>Summary</h2>
          <p className='text-violet-100'>{summary}</p>
        </div>
      )}

      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
