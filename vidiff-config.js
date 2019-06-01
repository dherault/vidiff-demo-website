export default {
  scenarios: [
    {
      name: 'Vidiff-demo-website tour',
      entry: 'test/visual-regression-test.js',
      browsers: [
        {
          name: "chrome",
          platform: "WIN10",
          version: "74",
        },
        {
          name: "firefox",
          platform: "LINUX",
          version: "67",
        },
      ],
    },
  ]
}
