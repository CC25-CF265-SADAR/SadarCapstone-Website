import { generateResultTemplate } from '../template';
import { recommendationModules } from '../data/recommendation-data';

export function handleQuizResult(userAnswers, correctAnswers) {
  const totalCorrect = calculateCorrectAnswers(userAnswers, correctAnswers);
  const characterData = determineCharacter(totalCorrect);
  const recommendedModules = determineRecommendedModules(userAnswers, correctAnswers);

  console.log('Jawaban User:', userAnswers);
  console.log('Jawaban Benar:', correctAnswers);
  console.log('Hasil Skor:', totalCorrect);
  console.log('Karakter:', characterData);
  console.log('Rekomendasi Modul:', recommendedModules);

  generateResultTemplate(characterData, recommendedModules);
}

function calculateCorrectAnswers(userAnswers, correctAnswers) {
  let correctCount = 0;

  for (let i = 0; i < correctAnswers.length; i++) {
    const user = userAnswers[i];
    const correct = correctAnswers[i];

    if (typeof correct === "object" && correct.right && correct.wrong) {
      const isRightCorrect =
        JSON.stringify(user.right.sort()) === JSON.stringify(correct.right.sort());
      const isWrongCorrect =
        JSON.stringify(user.wrong.sort()) === JSON.stringify(correct.wrong.sort());

      if (isRightCorrect && isWrongCorrect) {
        correctCount++;
      }
    } else {
      if (JSON.stringify(user) === JSON.stringify(correct)) {
        correctCount++;
      }
    }
  }

  return correctCount;
}

function determineCharacter(score) {
  if (score <= 2) return {
    name: 'Lensa Mainan',
    traits: ['Mudah terjebak', 'Penasaran tinggi', 'Mudah percaya', 'Minim pengalaman', 'Tidak berpikir panjang'],
    description: 'Dunia digital itu kayak taman bermain bagimu. Seru sih, tapi sayangnya belum bisa bedain mana mainan, mana jebakan. Yuk belajar bareng biar lensa kamu makin tajam dan nggak mudah kejebak jebakan online!',
    image: 'lensamainan.png',
  };
  if (score <= 4) return {
    name: 'Walkie Talkie Amatir',
    traits: ['Semangat update', 'Gampang salah paham', 'Kurang teliti', 'Minim validasi', 'Pengonsumsi info mentah' ],
    description: 'Alat komunikasimu aktif, tapi belum cukup kuat menangkap sinyal bahaya secara jelas. Terkadang kamu salah paham atau terlalu percaya sumber yang tidak valid. Tingkatkan kepekaanmu agar nggak mudah dibelokkan oleh informasi palsu!',
    image: 'walkietalkie.png',
  };
  if (score <= 6) return {
    name: 'Senter Retak',
    traits: ['Setengah waspada', 'Sering Ragu', 'Salah Sorot Ancaman', 'Skeptis', 'Intuisi Belum Terasah'],
    description: 'Kamu udah mulai nyalain "lampu waspada", tapi masih suka salah sorot. Senter kamu perlu upgrade biar bisa nyorot penipuan yang tersembunyi.',
    image: 'senterretak.png',
  };
  if (score <= 8) return {
    name: 'Kunci Kombinasi',
    traits: ['Sistematis', 'Tahu dasar keamanan' , 'Kadang Lengah', 'Cepat Percaya Ketika Terdistract', 'Kurang Konsisten'],
    description: 'Kamu punya sistem pengaman yang cukup solid. Tapi ingat, satu celah bisa dibobol kalau kamu terlalu buru-buru.',
    image: 'kuncikombinasi.png',
  };
  if (score <= 10) return {
    name: 'Scanner Intelijen',
    traits: ['Peka terhadap pola', 'Jarang tertipu', 'Punya insting kuat', 'Analitis', 'Tetap Rendah Hati'],
    description: 'Detektor digitalmu sensitif banget sama tanda-tanda bahaya. Udah jarang kejebak, tapi tetap butuh review biar selalu waspada. Kamu hampir pro, tinggal konsisten dan bantu yang lain!',
    image: 'scannerintel.png',
  };
  return {
    name: 'AI Detektor',
    traits: ['Super Waspada', 'Anti panik', 'Super Waspada', 'Protektif', 'Digital mentor'],
    description: ' Otakmu kayak gabungan Google, antivirus, dan feeling emak-emak kalau ada yang aneh. Nggak gampang panik, nggak gampang percaya. Kamu bukan cuma selamat dari tipu daya, tapi bisa jadi mentor buat yang lain!',
    image: 'aidetektor.png',
  };
}

function determineRecommendedModules(userAnswers, correctAnswers) {
  const modules = new Set();

  for (let i = 0; i < correctAnswers.length; i++) {
    const isCorrect = JSON.stringify(userAnswers[i]) === JSON.stringify(correctAnswers[i]);
    if (!isCorrect) {
      const moduleIndex = Math.floor(i / 2); // 0–5
      modules.add(recommendationModules[moduleIndex]);
    }
  }

  return Array.from(modules);
}