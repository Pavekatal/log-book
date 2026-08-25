module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/log-book/main',
        permanent: true,
      },
    ];
  },
};
