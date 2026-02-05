// api/health.js
export default function handler(req, res) {
  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Courses Registration API'
  });
}
