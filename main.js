import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLd1WDA9uF77_Oqn1YRm-1exSf7KBdLSo",
  authDomain: "ibrahim-af5f3.firebaseapp.com",
  projectId: "ibrahim-af5f3",
  storageBucket: "ibrahim-af5f3.appspot.com",
  messagingSenderId: "65867278858",
  appId: "1:65867278858:web:9bdaab0c0b44dbf14a8df3",
  measurementId: "G-TN3BT5MZJR"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggal: dok.data().tanggal,
      nis: dok.data().nis,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      noTlpn: dok.data().noTlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,
      
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahAbsensi(tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
      tanggal: tanggal,
      nis: nis,
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn,
      kelas: kelas,
      keterangan: keterangan
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "absensi", docId));
}

export async function ubahPembeli(docId, nama, alamat, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}