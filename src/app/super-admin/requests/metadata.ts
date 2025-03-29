import { Metadata } from 'next';

// This metadata configuration explicitly disables search engine indexing for admin pages
// and doesn't use any URL construction that could cause build issues
export const metadata: Metadata = {
  title: 'Requests Admin - Derrick Threatt for GCP HOA',
  description: 'Manage community requests',
  robots: 'noindex, nofollow',
};
