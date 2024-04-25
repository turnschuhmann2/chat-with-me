export async function timeout(ms: number) {
  const timeoutId = await new Promise<NodeJS.Timeout>(resolve => {
    const timeoutId = setTimeout(() => {
      resolve(timeoutId);
    }, ms);
  });

  clearTimeout(timeoutId);
}

export function generateId() {
  return Math.random().toString(16).slice(2);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
