export function generateGuestId() {
  if (typeof window === 'undefined') {
    return null;
  }

  let guestId = localStorage.getItem('guestId');

  if (!guestId) {
    if (crypto.randomUUID) {
      guestId = crypto.randomUUID();
    } else {
      guestId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;

          return v.toString(16);
        },
      );
    }

    localStorage.setItem('guestId', guestId);
  }

  return guestId;
}
