// ===================================================
// TaskMate — Aplikasi To-Do List
// ===================================================

// === Data tugas disimpan di array ===
let daftarTugas = [];
let filterAktif = "semua";
let idCounter = 0;
let editId = null;

// === Ambil data dari localStorage saat pertama kali ===
function muatData() {
    const data = localStorage.getItem("taskmate-data");
    if (data) {
        daftarTugas = JSON.parse(data);
        // Set idCounter ke id tertinggi + 1
        if (daftarTugas.length > 0) {
            idCounter = Math.max(...daftarTugas.map(t => t.id)) + 1;
        }
    }
}

// === Simpan data ke localStorage ===
function simpanData() {
    localStorage.setItem("taskmate-data", JSON.stringify(daftarTugas));
}

// === Inisialisasi saat halaman dimuat ===
document.addEventListener("DOMContentLoaded", function () {
    muatData();
    renderTugas();
    setupEventListeners();
});

// === Setup semua event listener ===
function setupEventListeners() {
    // Form tambah tugas
    const formTambah = document.getElementById("form-tambah");
    formTambah.addEventListener("submit", function (e) {
        e.preventDefault();
        tambahTugas();
    });

    // Filter tombol
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            filterAktif = this.getAttribute("data-filter");
            renderTugas();
        });
    });

    // Input pencarian
    const inputCari = document.getElementById("input-cari");
    inputCari.addEventListener("input", function () {
        renderTugas();
    });

    // Tombol hapus tugas selesai
    const btnHapusSelesai = document.getElementById("btn-hapus-selesai");
    btnHapusSelesai.addEventListener("click", function () {
        hapusSemuaSelesai();
    });

    // Modal edit — tombol simpan
    const btnSimpanEdit = document.getElementById("btn-simpan-edit");
    btnSimpanEdit.addEventListener("click", function () {
        simpanEdit();
    });

    // Modal edit — tombol batal
    const btnBatalEdit = document.getElementById("btn-batal-edit");
    btnBatalEdit.addEventListener("click", function () {
        tutupModal();
    });

    // Tutup modal saat klik overlay
    const modalOverlay = document.getElementById("modal-edit");
    modalOverlay.addEventListener("click", function (e) {
        if (e.target === modalOverlay) {
            tutupModal();
        }
    });

    // Keyboard shortcut: Escape untuk tutup modal
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            tutupModal();
        }
    });
}

// ===================================================
// TAMBAH TUGAS
// ===================================================
function tambahTugas() {
    const inputTugas = document.getElementById("input-tugas");
    const inputPrioritas = document.getElementById("input-prioritas");

    const nama = inputTugas.value.trim();
    if (nama === "") return;

    const tugas = {
        id: idCounter++,
        nama: nama,
        prioritas: inputPrioritas.value,
        selesai: false,
        tanggal: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    };

    daftarTugas.unshift(tugas);
    simpanData();
    renderTugas();

    // Reset input
    inputTugas.value = "";
    inputTugas.focus();
}

// ===================================================
// RENDER DAFTAR TUGAS
// ===================================================
function renderTugas() {
    const container = document.getElementById("daftar-tugas");
    const pesanKosong = document.getElementById("pesan-kosong");
    const inputCari = document.getElementById("input-cari");
    const kataCari = inputCari.value.toLowerCase().trim();

    // Filter tugas berdasarkan status dan pencarian
    let tugasFiltered = daftarTugas.filter(function (tugas) {
        // Filter status
        if (filterAktif === "selesai" && !tugas.selesai) return false;
        if (filterAktif === "belum" && tugas.selesai) return false;

        // Filter pencarian
        if (kataCari && !tugas.nama.toLowerCase().includes(kataCari)) return false;

        return true;
    });

    // Kosongkan container
    container.innerHTML = "";

    // Render setiap tugas
    if (tugasFiltered.length === 0) {
        pesanKosong.classList.add("tampil");
    } else {
        pesanKosong.classList.remove("tampil");

        tugasFiltered.forEach(function (tugas) {
            const li = buatElemenTugas(tugas);
            container.appendChild(li);
        });
    }

    // Update statistik
    updateStatistik();
}

// ===================================================
// BUAT ELEMEN HTML UNTUK SATU TUGAS
// ===================================================
function buatElemenTugas(tugas) {
    // Buat <li>
    const li = document.createElement("li");
    li.className = `tugas-item prioritas-${tugas.prioritas}`;
    li.setAttribute("data-id", tugas.id);

    if (tugas.selesai) {
        li.classList.add("selesai");
    }

    // Checkbox
    const checkbox = document.createElement("div");
    checkbox.className = "tugas-checkbox" + (tugas.selesai ? " checked" : "");
    checkbox.textContent = tugas.selesai ? "✓" : "";
    checkbox.addEventListener("click", function () {
        toggleSelesai(tugas.id);
    });

    // Konten
    const konten = document.createElement("div");
    konten.className = "tugas-konten";

    const nama = document.createElement("span");
    nama.className = "tugas-nama";
    nama.textContent = tugas.nama;

    const meta = document.createElement("div");
    meta.className = "tugas-meta";

    const badge = document.createElement("span");
    badge.className = `tugas-prioritas-badge badge-${tugas.prioritas}`;
    badge.textContent = tugas.prioritas;

    const tanggal = document.createElement("span");
    tanggal.textContent = tugas.tanggal;

    meta.appendChild(badge);
    meta.appendChild(tanggal);
    konten.appendChild(nama);
    konten.appendChild(meta);

    // Tombol aksi
    const aksi = document.createElement("div");
    aksi.className = "tugas-aksi";

    const btnEdit = document.createElement("button");
    btnEdit.className = "btn-aksi btn-edit";
    btnEdit.textContent = "✏️";
    btnEdit.title = "Edit tugas";
    btnEdit.addEventListener("click", function () {
        bukaModalEdit(tugas.id);
    });

    const btnHapus = document.createElement("button");
    btnHapus.className = "btn-aksi btn-hapus";
    btnHapus.textContent = "🗑️";
    btnHapus.title = "Hapus tugas";
    btnHapus.addEventListener("click", function () {
        hapusTugas(tugas.id);
    });

    aksi.appendChild(btnEdit);
    aksi.appendChild(btnHapus);

    // Susun elemen
    li.appendChild(checkbox);
    li.appendChild(konten);
    li.appendChild(aksi);

    return li;
}

// ===================================================
// TOGGLE SELESAI / BELUM
// ===================================================
function toggleSelesai(id) {
    const tugas = daftarTugas.find(t => t.id === id);
    if (tugas) {
        tugas.selesai = !tugas.selesai;
        simpanData();
        renderTugas();
    }
}

// ===================================================
// HAPUS TUGAS
// ===================================================
function hapusTugas(id) {
    // Animasi keluar
    const elemen = document.querySelector(`.tugas-item[data-id="${id}"]`);
    if (elemen) {
        elemen.classList.add("removing");
        setTimeout(function () {
            daftarTugas = daftarTugas.filter(t => t.id !== id);
            simpanData();
            renderTugas();
        }, 300);
    }
}

// ===================================================
// HAPUS SEMUA TUGAS YANG SELESAI
// ===================================================
function hapusSemuaSelesai() {
    const itemsSelesai = document.querySelectorAll(".tugas-item.selesai");
    itemsSelesai.forEach(el => el.classList.add("removing"));

    setTimeout(function () {
        daftarTugas = daftarTugas.filter(t => !t.selesai);
        simpanData();
        renderTugas();
    }, 300);
}

// ===================================================
// MODAL EDIT
// ===================================================
function bukaModalEdit(id) {
    const tugas = daftarTugas.find(t => t.id === id);
    if (!tugas) return;

    editId = id;

    const modal = document.getElementById("modal-edit");
    const inputEdit = document.getElementById("edit-input");
    const selectPrioritas = document.getElementById("edit-prioritas");

    inputEdit.value = tugas.nama;
    selectPrioritas.value = tugas.prioritas;

    modal.classList.add("tampil");
    inputEdit.focus();
}

function simpanEdit() {
    if (editId === null) return;

    const inputEdit = document.getElementById("edit-input");
    const selectPrioritas = document.getElementById("edit-prioritas");

    const namaBaru = inputEdit.value.trim();
    if (namaBaru === "") return;

    const tugas = daftarTugas.find(t => t.id === editId);
    if (tugas) {
        tugas.nama = namaBaru;
        tugas.prioritas = selectPrioritas.value;
        simpanData();
        renderTugas();
    }

    tutupModal();
}

function tutupModal() {
    const modal = document.getElementById("modal-edit");
    modal.classList.remove("tampil");
    editId = null;
}

// ===================================================
// UPDATE STATISTIK
// ===================================================
function updateStatistik() {
    const total = daftarTugas.length;
    const selesai = daftarTugas.filter(t => t.selesai).length;
    const belum = total - selesai;
    const persen = total > 0 ? Math.round((selesai / total) * 100) : 0;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-selesai").textContent = selesai;
    document.getElementById("stat-belum").textContent = belum;

    document.getElementById("progress-fill").style.width = persen + "%";
    document.getElementById("progress-label").textContent = persen + "%";

    // Tampilkan/sembunyikan tombol hapus selesai
    const btnHapusSelesai = document.getElementById("btn-hapus-selesai");
    btnHapusSelesai.style.display = selesai > 0 ? "inline-block" : "none";

    // Update pesan kosong
    const pesanKosong = document.getElementById("pesan-kosong");
    if (total === 0) {
        pesanKosong.classList.add("tampil");
    }
}
