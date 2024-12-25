import { useGetSchools } from "@openapi/queries";

export default function LandingScreen() {
  const { error, data, status } = useGetSchools();
  console.log({ error, data, status });
  return (
    <>
      Welcome to the landing screen!
    </>
  );
}