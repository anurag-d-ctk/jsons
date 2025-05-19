const utils = require('./util');

describe('String Utilities', () => {
  test('capitalize capitalizes the first letter', () => {
    expect(utils.capitalize('hello')).toBe('Hello');
    expect(utils.capitalize('')).toBe('');
  });

  test('reverseString reverses a string', () => {
    expect(utils.reverseString('hello')).toBe('olleh');
    expect(utils.reverseString('')).toBe('');
  });

  test('isPalindrome checks for palindrome', () => {
    expect(utils.isPalindrome('racecar')).toBe(true);
    expect(utils.isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    expect(utils.isPalindrome('hello')).toBe(false);
  });
});

describe('Date Utilities', () => {
  test('formatDate formats date to YYYY-MM-DD', () => {
    expect(utils.formatDate('2024-06-01T12:00:00Z')).toBe('2024-06-01');
    expect(utils.formatDate(new Date('2024-06-01'))).toBe('2024-06-01');
  });

  test('daysBetween calculates days between two dates', () => {
    expect(utils.daysBetween('2024-06-01', '2024-06-10')).toBe(9);
    expect(utils.daysBetween('2024-06-10', '2024-06-01')).toBe(9);
  });

  test('isWeekend checks if a date is a weekend', () => {
    expect(utils.isWeekend('2024-06-01')).toBe(true); // Saturday
    expect(utils.isWeekend('2024-06-02')).toBe(true); // Sunday
    expect(utils.isWeekend('2024-06-03')).toBe(false); // Monday
  });
}); 