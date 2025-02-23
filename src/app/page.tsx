import dynamic from "next/dynamic";

const HAL900Header = dynamic(() => import("@/components/HAL900-Header"), {
  ssr: true,
});

const HAL900Hero = dynamic(() => import("@/components/HAL900-Hero"), {
  ssr: true,
});

const HAL900ScaleWithPrecision = dynamic(
  () => import("@/components/HAL900-ScaleWithPrecision"),
  { ssr: true }
);

const HAL900TailoredStrategies = dynamic(
  () => import("@/components/HAL900-TailoredStrategies"),
  { ssr: true }
);

const HAL900BookingInterface = dynamic(
  () => import("@/components/HAL900-BookingInterface"),
  { ssr: true }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-scailer-dark">
      <HAL900Header />
      <HAL900Hero />
      <HAL900ScaleWithPrecision />
      <HAL900TailoredStrategies />
      <HAL900BookingInterface />
    </main>
  );
}
