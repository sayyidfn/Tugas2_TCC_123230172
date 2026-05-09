const apiUrl = "https://be-tugas3-tcc-172-325409493725.us-central1.run.app/notes";
const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const noteIdInput = document.getElementById("noteId");
const judulInput = document.getElementById("judul");
const isiInput = document.getElementById("isi");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// 1. Fungsi Mengambil & Menampilkan Catatan (READ)
async function fetchNotes() {
  const response = await fetch(apiUrl);
  const notes = await response.json();
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const div = document.createElement("div");
    div.className = "note-card";
    // Memformat tanggal agar lebih rapi
    const tanggal = new Date(note.tanggal_dibuat).toLocaleString("id-ID");

    div.innerHTML = `
            <h3>${note.judul}</h3>
            <span class="note-date">${tanggal}</span>
            <p>${note.isi}</p>
            <div class="btn-group">
                <button class="edit-btn" onclick="editNote(${note.id}, '${note.judul}', '${note.isi}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Hapus</button>
            </div>
        `;
    notesList.appendChild(div);
  });
}

// 2. Fungsi Tambah dan Update Catatan (CREATE & UPDATE)
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = noteIdInput.value;
  const data = { judul: judulInput.value, isi: isiInput.value };

  if (id) {
    // Jika ada ID, berarti mode EDIT (PUT)
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } else {
    // Jika tidak ada ID, berarti mode TAMBAH (POST)
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  resetForm();
  fetchNotes();
});

// 3. Fungsi Menyiapkan Form untuk Edit
function editNote(id, judul, isi) {
  noteIdInput.value = id;
  judulInput.value = judul;
  isiInput.value = isi;
  saveBtn.textContent = "Update Catatan";
  cancelBtn.style.display = "inline-block";
}

// 4. Fungsi Hapus Catatan (DELETE)
async function deleteNote(id) {
  if (confirm("Yakin ingin menghapus catatan ini?")) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchNotes();
  }
}

// Fungsi Batal Edit & Reset Form
function resetForm() {
  noteIdInput.value = "";
  judulInput.value = "";
  isiInput.value = "";
  saveBtn.textContent = "Simpan Catatan";
  cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);

// Muat catatan saat halaman pertama kali dibuka
fetchNotes();
