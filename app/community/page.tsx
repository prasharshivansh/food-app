import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Orange Feast Community",
  description: "Join the Orange Feast community to share recipes, cooking tips, and connect with other food lovers.",
};

export default function CommunityPage() {
  return (
    <main>
      <h1 style={{ color: 'orange', textAlign: 'center' }}>Community</h1>
      <p style={{ textAlign: 'center' }}>Welcome to our food community!</p>
    </main>
  );
}