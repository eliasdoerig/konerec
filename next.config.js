module.exports = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  images: {
    domains: ["images.ctfassets.net"],
    imageSizes: [48, 512, 1024],
  },
};
