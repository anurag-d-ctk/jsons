// String Utilities
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

function isPalindrome(str: string): boolean {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
}

// Date Utilities
function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

function daysBetween(date1: string | Date, date2: string | Date): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function isWeekend(date: string | Date): boolean {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6;
}

export {
  capitalize,
  reverseString,
  isPalindrome,
  formatDate,
  daysBetween,
  isWeekend,
}; 