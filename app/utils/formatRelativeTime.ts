function formatRelativeTime(date: Date) {
  const now = new Date();

  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `Posted ${diffInDays} days ago`;
  }
}

export default formatRelativeTime;
