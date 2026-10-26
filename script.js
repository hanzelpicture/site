const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.service-select').forEach(button => {
  button.addEventListener('click', () => {
    const select = document.querySelector('#service-select');
    select.value = button.dataset.service;
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => select.focus({ preventScroll: true }), 500);
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = (form.get('name') || '').trim();
  const service = form.get('service') || 'Belum dipilih';
  const date = form.get('date') || 'Belum ditentukan';
  const location = (form.get('location') || '').trim() || 'Belum ditentukan';
  const details = (form.get('details') || '').trim() || 'Belum ada detail tambahan';
  const message = [
    'Halo Hanzel.Picture, saya ingin konsultasi pemesanan layanan fotografi.',
    '',
    `Nama: ${name}`,
    `Layanan: ${service}`,
    `Perkiraan tanggal: ${date}`,
    `Lokasi: ${location}`,
    `Detail kebutuhan: ${details}`,
    '',
    'Mohon informasi ketersediaan dan estimasi kebutuhan layanan. Terima kasih.'
  ].join('\\n');
  const whatsapp = '6288294849594';
  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});