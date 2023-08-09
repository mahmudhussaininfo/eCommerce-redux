export const timeAgo = (date) => {
  const currentDate = new Date();
  const givenDate = new Date(date);

  // Check if the given date is valid
  if (isNaN(givenDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const timeDifference = currentDate.getTime() - givenDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "a year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "a day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 5 ? "just now" : `${seconds} seconds ago`;
  }
};

//for random password
export const generateRandomPassword = (length = 10) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};
