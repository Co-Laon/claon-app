export default function debounce(callback: any, duration: number) {
  let timer: NodeJS.Timer;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), duration);
  };
}
