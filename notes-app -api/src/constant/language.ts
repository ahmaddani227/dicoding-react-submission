type LanguageTypes = {
  [key: string]: {
    [key: string]: string;
  };
};

export const LanguageLogin: LanguageTypes = {
  en: {
    title: "Login",
    subTitle: "Login to your account",
    footer: "Don't have an account?",
    footerLink: "Register",

    // Message Auth
    requiredEmail: "Email is required",
    validEmail: "Invalid Email",
    requiredPassword: "Password is required",
    minPassword: "Password must be at least 6 characters",
    maxPassword: "The maximum password is 15 characters",

    alertSuccessLogin: "Login Successfully",
  },
  id: {
    title: "Masuk",
    subTitle: "Masuk ke akun Anda",
    footer: "Belum punya akun?",
    footerLink: "Daftar",

    // Message Auth
    requiredEmail: "Email harus diisi",
    validEmail: "Email tidak valid",
    requiredPassword: "Kata Sandi harus diisi",
    minPassword: "Kata Sandi minimal 6 karakter",
    maxPassword: "Kata Sandi maksimal 15 karakter",
    alertSuccessLogin: "Login Berhasil",
  },
};

export const LanguageRegister: LanguageTypes = {
  en: {
    title: "Register",
    subTitle: "Register your account",
    footer: "Already have an account?",
    footerLink: "Login",

    // Message Auth
    requiredName: "Name is required",
    minName: "Name must be at least 4 characters",
    maxName: "The maximum name is 15 characters",

    requiredEmail: "Email is required",
    validEmail: "Invalid Email",

    requiredPassword: "Password is required",
    minPassword: "Password must be at least 6 characters",
    maxPassword: "The maximum password is 15 characters",

    requiredConfPassword: "Confirm Password is required",
    matchPassword: "Confirm Password must match Password",

    alertSuccessRegister: "Register Successfully",
  },
  id: {
    title: "Daftar",
    subTitle: "Daftarkan akun anda",
    footer: "Sudah punya akun?",
    footerLink: "Masuk",

    // Message Auth
    requiredName: "Nama harus diisi",
    minName: "Nama minimal 4 karakter",
    maxName: "Nama Maksimal 15 karakter",

    requiredEmail: "Email harus diisi",
    validEmail: "Email tidak valid",

    requiredPassword: "Kata Sandi harus diisi",
    minPassword: "Kata Sandi minimal 6 karakter",
    maxPassword: "Kata Sandi maksimal 15 karakter",

    requiredConfPassword: "Konfirmasi Password harus diisi",
    matchPassword: "Konfirmasi Password harus sesuai dengan Password",
    alertSuccessRegister: "Daftar Berhasil",
  },
};

export const LanguageAppLayout: LanguageTypes = {
  en: {
    // Navbar
    title: "Notes App",
    archived: "Archived",
    logout: "Logout",
    footer: "Notes App Api",
  },
  id: {
    // Navbar
    title: "Aplikasi Catatan",
    archived: "Diarsipkan",
    logout: "Keluar",

    footer: "Catatan Aplikasi API",
  },
};

export const LanguageHome: LanguageTypes = {
  en: {
    title: "Notes List",
    createNote: "Create Note",
    placeholderSearch: "Search...",
    emptyNotes: "No notes found!",

    // Modal Add
    titleModal: "Add Note",
    btnAdd: "Add",

    // Message validation
    requiredTitle: "Title is required",
    maxTitle: "The maximum title is 50 characters",
    requiredDescription: "Description is required",
    alertSuccess: "Data added successfully!",
    alertDelete: "Note successfully deleted",
  },
  id: {
    title: "Daftar Catatan",
    createNote: "Buat Catatan",
    placeholderSearch: "Cari...",
    emptyNotes: "Tidak ada catatan!",

    // Modal Add
    titleModal: "Tambah Catatan",
    btnAdd: "Tambah",

    // Message validation
    requiredTitle: "Judul harus diisi",
    maxTitle: "Title maksimal 50 karakter",
    requiredDescription: "Deskripsi harus diisi",
    alertSuccess: "Data berhasil ditambahkan!",
    alertDelete: "Note berhasil di hapus",
  },
};

export const LanguageArchive: LanguageTypes = {
  en: {
    title: "Archive Notes",
    alertUnarchive: "Note unarchived successfully!",
    alertDelete: "Note successfully deleted",
    emptyData: "No records are archived",
  },
  id: {
    title: "Catatan Arsip",
    alertUnarchive: "Note berhasil di pindah",
    alertDelete: "Note berhasil di hapus",
    emptyData: "Tidak ada catatan yang diarsipkan",
  },
};

export const LanguageCard: LanguageTypes = {
  en: {
    delete: "Delete",
    archive: "Archive",
    unArchive: "Unarchive",
  },
  id: {
    delete: "Hapus",
    archive: "Arsip",
    unArchive: "Pindah",
  },
};
