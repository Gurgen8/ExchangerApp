export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  } as T;
}
