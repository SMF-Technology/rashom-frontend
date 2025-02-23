// app/page.js
import DressStyle from "./components/DressStyle";
import Affiliate from "./components/Affiliate";
import ImageSlider from "./components/ImageSlider";
import CommonComponentWrapper from "./components/CommonComponentWrapper";
import { fetchData } from "./lib/fetchData";
// Force Next.js to always fetch fresh data
export const dynamic = "force-dynamic";

export default async function Home() {
  const { productsData, productsData1 } = await fetchData();

  const products = productsData.map((edge) => edge.node);

  const topSellingProducts = productsData1.map((edge) => edge.node);

  return (
    <main>
      <ImageSlider />
      <CommonComponentWrapper title="New Arrival" products={products} />
      <CommonComponentWrapper title="Top Selling" products={topSellingProducts} />
      <DressStyle />
      <Affiliate />
    </main>
  );
}
