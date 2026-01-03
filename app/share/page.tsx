import { Metadata } from 'next';
import SharePageClient from './SharePageClient';

export const metadata: Metadata = {
  title: "Share a Recipe - Orange Feast",
  description: "Share your favorite recipe with the Orange Feast community.",
};

export default function SharePage() {
  return <SharePageClient />;
}