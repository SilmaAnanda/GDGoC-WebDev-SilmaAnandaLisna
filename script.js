// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', function () {
  mobileNav.classList.toggle('hidden');
});

function closeNav() {
  mobileNav.classList.add('hidden');
}

// HEADER SHADOW SAAT SCROLL
window.addEventListener('scroll', function () {
  const header = document.getElementById('header');
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 20px rgba(219,39,119,0.1)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// FAQ TOGGLE
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');

  document.querySelectorAll('.faq-answer').forEach(function (a) {
    a.classList.remove('open');
  });
  document.querySelectorAll('.faq-icon').forEach(function (i) {
    i.style.transform = 'rotate(0deg)';
  });

  if (!isOpen) {
    answer.classList.add('open');
    icon.style.transform = 'rotate(45deg)';
  }
}

// VALIDASI FORM & POPUP
function daftar() {
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const wa = document.getElementById('wa').value.trim();
  const fakultas = document.getElementById('fakultas').value;
  const angkatan = document.getElementById('angkatan').value;

  if (!nama || !email || !wa || !fakultas || !angkatan) {
    alert('Lengkapi semua kolom yang wajib diisi ya (*)');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    alert('Format email tidak valid.');
    return;
  }

  if (!/^[0-9]+$/.test(wa)) {
    alert('Nomor WhatsApp hanya boleh berisi angka.');
    return;
  }

  if (wa.length < 10 || wa.length > 13) {
    alert('Nomor WhatsApp tidak valid.');
    return;
  }

  document.getElementById('popup-msg').textContent =
    'Halo ' + nama + '! Pendaftaranmu dari Fakultas ' + fakultas + ' angkatan ' + angkatan + ' sudah kami terima. Konfirmasi akan dikirim ke ' + email + ' dalam 1x24 jam.';

  document.getElementById('popup').classList.remove('hidden');

  // Reset form
  ['nama','email','wa','fakultas','angkatan','exp','source','pesan'].forEach(function(id) {
    document.getElementById(id).value = '';
  });

  // Update kuota
  const kuotaEl = document.getElementById('kuota');
  const angka = parseInt(kuotaEl.textContent);
  if (angka > 1) kuotaEl.textContent = (angka - 1) + ' tempat';
  else kuotaEl.textContent = 'Hampir penuh!';
}

function tutupPopup() {
  document.getElementById('popup').classList.add('hidden');
}

// ANIMASI SCROLL
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .speaker-card, .timeline-item, .faq-item').forEach(function (el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
