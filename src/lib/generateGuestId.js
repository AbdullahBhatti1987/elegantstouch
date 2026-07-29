export function generateGuestId() {
  if (typeof window === 'undefined') {
    return null;
  }

  let guestId = localStorage.getItem('guestId');

  if (!guestId) {
    const date = new Date();

    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let random = '';

    for (let i = 0; i < 8; i++) {
      random += chars.charAt(
        Math.floor(Math.random() * chars.length),
      );
    }

    guestId = `ET-${year}${month}${day}-${random}`;

    localStorage.setItem('guestId', guestId);
  }

  return guestId;
}
