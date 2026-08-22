// --- SAHNA Bosh Sahifa Logikasi ---

// 1. Kun / Tun Rejimi
const themeToggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

if (localStorage.getItem('theme') === 'light') {
  html.classList.remove('dark');
}

// 2. Mobil Menyu
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 3. Viloyatlar bo'yicha saralash (Filtr)
function filterVideographers() {
  const citySelect = document.getElementById('heroCity');
  if (!citySelect) return;
  const city = citySelect.value;
  const cityText = citySelect.options[citySelect.selectedIndex].text;
  
  const badge = document.getElementById('activeFilterBadge');
  if (badge) badge.textContent = cityText;

  const cards = document.querySelectorAll('.studio-card');
  cards.forEach(card => {
    const reg = card.getAttribute('data-region') || '';
    if (city === 'all' || reg.includes(city) || reg.includes('all')) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  document.getElementById('videographers')?.scrollIntoView({ behavior: 'smooth' });
}

// 4. Onlayn Taklifnoma Jonli Tahrirlash (Live Preview)
function updateInvitePreview() {
  const names = document.getElementById('invBrideGroom');
  const text = document.getElementById('invText');
  const date = document.getElementById('invDate');
  const time = document.getElementById('invTime');
  const venue = document.getElementById('invVenue');

  if (names) document.getElementById('previewNames').textContent = names.value || 'Kelin & Kuyov';
  if (text) document.getElementById('previewText').textContent = `"${text.value}"`;
  if (date) document.getElementById('previewDate').textContent = date.value;
  if (time) document.getElementById('previewTime').textContent = time.value;
  if (venue) document.getElementById('previewVenue').textContent = venue.value;
}

function publishInvitation() {
  const names = document.getElementById('invBrideGroom')?.value || 'toyi';
  const slug = names.toLowerCase().replace(/[^a-z0-9]/g, '-');
  alert(`To'y taklifnomasi havolasi tayyor:\nhttps://sahna-sayt.vercel.app/toyi/${slug}`);
}

// 5. Aniq Smeta Hisoblagich
function calculateTotal() {
  let total = 0;
  if (document.getElementById('calcVideo')?.checked) total += 6000000;
  if (document.getElementById('calcAlbum')?.checked) total += 450000;
  if (document.getElementById('calcLoveStory')?.checked) total += 2000000;
  if (document.getElementById('calcLiveStream')?.checked) total += 1500000;
  
  const totalElem = document.getElementById('totalCost');
  if (totalElem) totalElem.textContent = total.toLocaleString('uz-UZ') + " UZS";
}

function downloadSmetaSummary() {
  const total = document.getElementById('totalCost')?.textContent || '0 UZS';
  alert(`SAHNA to'y smetasi saqlandi!\nJami media xizmatlar: ${total}`);
}

// 6. Kalendarga Eslatma Qo'shish
function openAddEventModal() {
  const m = document.getElementById('addEventModal');
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
}

function closeAddEventModal() {
  const m = document.getElementById('addEventModal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function saveNewEvent() {
  const title = document.getElementById('eventTitle')?.value;
  const date = document.getElementById('eventDate')?.value;
  const time = document.getElementById('eventTime')?.value;
  const desc = document.getElementById('eventDesc')?.value;

  if (!title) {
    alert("Iltimos, ismlarni kiriting!");
    return;
  }

  const grid = document.getElementById('scheduleGrid');
  if (grid) {
    const item = document.createElement('div');
    item.className = "p-4 rounded-2xl bg-slate-50 dark:bg-brand-cardDark border border-brand-borderLight dark:border-brand-borderDark space-y-2";
    item.innerHTML = `
      <div class="flex justify-between items-center text-xs">
        <span class="font-bold text-brand-gold">${date}</span>
        <span class="text-slate-400">${time}</span>
      </div>
      <h4 class="font-bold text-sm text-slate-900 dark:text-white">${title} to'yi</h4>
      <p class="text-xs text-slate-500 leading-relaxed">${desc || "To'y sanasi belgilandi."}</p>
    `;
    grid.prepend(item);
  }
  closeAddEventModal();
}

// 7. Video Pleyer
function openVideoPlayer(url) {
  const iframe = document.getElementById('videoIframe');
  const modal = document.getElementById('videoModal');
  if (iframe && modal) {
    iframe.src = url;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeVideoPlayer() {
  const iframe = document.getElementById('videoIframe');
  const modal = document.getElementById('videoModal');
  if (iframe && modal) {
    iframe.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// 8. Fikr va Taklif Yuborish
function sendFeedback() {
  const input = document.getElementById('feedbackInput');
  if (!input || !input.value.trim()) {
    alert("Iltimos, avval fikringizni yozing!");
    return;
  }
  alert("Taklifingiz muvaffaqiyatli qabul qilindi!");
  input.value = '';
}
