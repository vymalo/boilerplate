import { useGetSchools } from "@openapi/queries";

export default function LandingScreen() {
  const { error, data, status } = useGetSchools();
  return (
    <div className='container mx-auto'>
      Welcome to the landing screen!

      <pre className='bg-base-200 rounded p-4'>
        <code>
          {JSON.stringify({ error, data, status }, null, 2)}
        </code>
      </pre>
    </div>
  );
}