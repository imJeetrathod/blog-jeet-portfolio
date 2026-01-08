/**
 * Formats a date string to relative time (e.g., "2 days ago", "1 week ago")
 * Falls back to formatted date if more than 10 days old
 * @param {string} dateString - Date string in ISO format
 * @returns {string} Formatted relative time or date
 */
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  // If more than 10 days, show the formatted date
  if (diffInDays > 10) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Less than 1 hour
  if (diffInHours < 1) {
    if (diffInMinutes < 1) {
      return 'Just now';
    }
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }

  // Less than 1 day
  if (diffInDays < 1) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  // 1-10 days
  if (diffInDays === 1) {
    return '1 day ago';
  }

  if (diffInDays <= 7) {
    return `${diffInDays} days ago`;
  }

  // More than 7 days but less than 10 days
  const weeks = Math.floor(diffInDays / 7);
  const remainingDays = diffInDays % 7;
  
  if (weeks === 1 && remainingDays === 0) {
    return '1 week ago';
  }
  
  if (weeks === 1) {
    return `1 week, ${remainingDays} day${remainingDays === 1 ? '' : 's'} ago`;
  }

  return `${diffInDays} days ago`;
}