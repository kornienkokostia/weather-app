export function debounce<T extends (...args: any[]) => void>(fn: T, wait: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    const context = this;

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

export const capFirstLetter = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}