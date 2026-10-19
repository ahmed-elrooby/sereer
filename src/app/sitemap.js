
const baseUrl = "https://sreer.net";

export default function sitemap() {
  return [
    {
      url: `${baseUrl}/Patient`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
