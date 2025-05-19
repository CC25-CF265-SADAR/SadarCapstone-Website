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
    traits: ['Kurang Waspada', 'Mudah Tertipu'],
    description: 'Kamu masih perlu belajar membedakan mana informasi yang valid dan yang menipu.',
    image: 'lensamainan.png',
  };
  if (score <= 4) return {
    name: 'Walkie Talkie Amatir',
    traits: ['Sering Bingung', 'Gampang Terpengaruh'],
    description: 'Wawasanmu mulai terbentuk, tapi tetap rentan terhadap teknik manipulasi.',
    image: 'walkietalkie.png',
  };
  if (score <= 6) return {
    name: 'Senter Retak',
    traits: ['Cukup Waspada', 'Sering Ragu'],
    description: 'Kamu mulai peka terhadap penipuan, tapi masih sering salah arah.',
    image: 'senterretak.png',
  };
  if (score <= 8) return {
    name: 'Kunci Kombinasi',
    traits: ['Analitis', 'Masih Butuh Latihan'],
    description: 'Kamu mulai mengunci pola penipuan, tapi perlu lebih tajam.',
    image: 'kuncikombinasi.png',
  };
  if (score <= 10) return {
    name: 'Scanner Intelijen',
    traits: ['Cermat', 'Tegas'],
    description: 'Kamu hampir sempurna mendeteksi penipuan, tinggal sedikit lagi.',
    image: 'scannerintel.png',
  };
  return {
    name: 'AI Detektor',
    traits: ['Super Waspada', 'Anti Tipu'],
    description: 'Kamu sangat piawai dalam mendeteksi tipu muslihat online.',
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