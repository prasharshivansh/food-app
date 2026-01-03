import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Orange Feast",
  description: "Learn more about Orange Feast, our mission, and the team behind the delicious recipes.",
};

export default function AboutPage() {
  return (
    <main>
      <h1 style={{ color: 'orange', textAlign: 'center' }}>About Us</h1>
      <p style={{ textAlign: 'center' }}>This is the about page for our food app.</p>
    </main>
  );
}