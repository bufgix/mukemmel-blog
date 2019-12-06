export const getPosts = () => {
  return [
    {
      title: "mukemmel-blog v1.0.1",
      slug: "ozelikler",
      details: require("./posts/ozelikler.md").default,
      date: "6 Aralık 2019",
      imageUrl: "https://i.hizliresim.com/nbqQ2a.jpg"
    },
    {
      title: "Örnek yazı",
      slug: "ornek-yazi",
      details: require("./posts/ornek-yazi.md").default,
      date: "3 Aralık 2019",
      imageUrl: "https://i.hizliresim.com/Rg5r9o.jpg"
    }
  ];
};
