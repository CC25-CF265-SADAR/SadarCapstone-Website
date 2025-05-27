export function generateModuleTemplate({ imageSrc, title, description, link }) {
  return `
    <section class="w-80 flex flex-col items-center gap-y-5 justify-items-center text-center max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <img
      src="${imageSrc}"
      />
      <a href="#">
        <h3 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${title}</h3>
      </a>
      <p class="mb-3 font-normal text-base text-gray-700 dark:text-gray-400">${description}</p>
      <a href="${link}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-[#2C6F82] bg-[#DFF0F5] rounded-lg hover:bg-[#2C6F82] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Mulai Belajar
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </a>
    </section>
    `;
}

export function generateModuleDetailTemplate() {
  return `
    <section class="card bg-base-100 w-6xl shadow-sm mx-auto rounded-xl">
      <div class="flex flex-row justify-between items-center pt-7 pb-9 px-12 rounded-xl border-b-2 bg-[#FF6250] text-white border-neutral-100 px-6 py-3 leading-tight dark:border-white/10">
        <article class="w-3xl flex flex-col gap-3">
          <h1 class="text-lg font-semibold">
            AntiTertipu
          </h1>
          <h2 class="text-3xl font-semibold">
            Belajar Membedakan Penipuan Online
          </h2>
          <p class="text-lg font-regular mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div class="flex flex-row items-center mt-5 gap-2">
            <img src="images/clock.svg">
            <p class="text-base font-regular">
            Estimasi belajar: 30 Menit
            </p>
          </div>
        </article>
        <img src="images/icon-module-detail-belajar-penipuan-online.png" alt="logo belajar penipuan online" class="w-40 h-40">
      </div>
      
      <div class="card-body flex flex-row justify-between items-center px-12">
        <div class="flex flex-row gap-5 items-center">
          <div class="w-xl h-6 mb-6 bg-gray-200 rounded-full dark:bg-gray-700 mt-6">
            <div class="h-6 bg-[#FF6250] rounded-full dark:bg-blue-500" style="width: 45%"></div>
          </div>
          <p class="text-lg font-semibold text-[#FF6250]">45%</p>
        </div>
  
        <div class="card-actions">
          <a href="#/modul-belajar">
            <button class="btn px-12 py-6 rounded-md bg-[#FF6250] hover:bg-[#e05545] text-white shadow-md shadow-[#FF6250] border-transparent hover:shadow-lg focus:ring-4 focus:ring-[#ff625066]">
              Belajar Sekarang
            </button>
          </a>
        </div>
      </div>
    </section>
    `;
}

export function generateVideoPlayer() {
  return `
        //isi disini
    `;
}

export function generateModuleSylabusTemplate() {
  return `
        <section>Ini isi silabus</section>
    `;
}

export function generateModuleNavbarTemplate(moduleTitle) {
  return `
    <nav class="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-30">
      <button id="backBtn" class="text-white bg-[#2C6F82] hover:bg-[#244f5a] focus:ring-2 focus:ring-[#2C6F82]/50 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center shadow-md">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <h1 class="text-lg font-semibold">${moduleTitle}</h1>

      <button id="toggleSidebar" class="text-2xl text-[#2C6F82] hover:text-[#163741]">
        &#9776;
      </button>
    </nav>
  `;
}

export function generateModuleSidebarTemplate(module, currentTopicId) {
  const topicItems = module.topics.map(topic => {
    const isActive = topic.id === currentTopicId ? 'font-semibold text-blue-700' : '';
    const check = topic.checkpoint ? '<span class="ml-2 text-green-600">✔</span>' : '';
    return `<li class="text-sm ${isActive}">${topic.title}${check}</li>`;
  }).join('');

  return `
    <div class="bg-white rounded-xl p-4 mt-2 mx-2">
      <h2 class="text-lg font-bold mb-2">Daftar Modul</h2>
      ${generateModuleProgressbarTemplate(module.topics)}
      <ul class="space-y-2 mt-4">${topicItems}</ul>
    </div>
  `;
}

export function generateModuleProgressbarTemplate(topics) {
  const total = topics.length;
  const completed = topics.filter(t => t.checkpoint).length;
  const percent = Math.floor((completed / total) * 100);

  return `
    <div class="mb-1 text-sm text-gray-600">${percent}% Selesai</div>
    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${percent}%"></div>
    </div>
  `;
}

export function generateModuleContentTextTemplate(content) {
  return `
    <article class="prose max-w-none px-20 py-6">
      <h2 class="text-2xl font-bold mb-4">${content.title}</h2>
      <p class="text-base">${content.content}</p>
    </article>
  `;
}

export function generateModuleFooterTemplate(text) {
  return `
    <div class="fixed bottom-0 left-10 right-10 bg-white border-t border-gray-300 px-4 py-3 z-50">
      <div class="max-w-5xl mx-auto flex items-center justify-between text-sm sm:text-base font-medium text-gray-800">

        <!-- Tombol Sebelumnya -->
        <button
          id="prev-button"
            class="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              <svg class="w-4 h-4 me-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10" aria-hidden="true">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0l4 4M1 5l4-4" />
              </svg>
              <span>Sebelumnya</span>
          </button>

          <!-- Judul Materi -->
        <h3 id="material-title" class="text-center font-semibold text-gray-800 truncate max-w-[50%]">
          ${text}
        </h3>
        
        <!-- Tombol Selanjutnya -->
        <a href="/#/quiz-modul">
        <button
          id="next-button"
            class="flex items-center bg-[#42A7C3] hover:bg-[#2C6F82] text-white px-4 py-2 rounded">
             <span>Selanjutnya</span>
               <svg class="w-4 h-4 ms-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10" aria-hidden="true">
                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
        </button>
</a>
      </div>
    </div>
  `;
}

export function generateProgressModuleQuizTemplate() {
  const dots = Array(5)
    .fill(`<span class="w-2 h-2 rounded-full bg-[#42A7C3] opacity-100 inline-block"></span>`)
    .join('');

  return `
    <div class="w-full max-w-xl md:max-w-[640px] mx-auto mt-6 px-4">
      <div class="flex flex-col gap-2 text-left">
        <div>
          <p class="text-sm font-semibold text-gray-500">AntiTertipu</p>
          <p id="progress-text" class="text-base font-semibold text-[#42A7C3]">0/5 telah dijawab</p>
        </div>

        <div class="relative w-full h-4 bg-[#E0E0E0] rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <div id="progress-bar"
            class="absolute top-0 left-0 h-full bg-[#42A7C3] rounded-lg transition-all duration-300 z-0"
            style="width: 0%;">
          </div>

          <div id="progress-dots"
            class="absolute top-1/2 left-0 w-full flex justify-between px-1 -translate-y-1/2 pointer-events-none z-20">
            ${dots}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateQuizModuleQuestionTemplate({ id, question, options }) {
  const inputName = `question-${id}`;

  return `
    <div class="quiz-container w-full max-w-md mx-auto p-6 space-y-8">
      <h2 class="text-base font-semibold text-[#000000] text-center">${question}</h2>

      <form class="space-y-3 mt-5 mb-8" data-question-id="${id}">
        ${options
          .map(
            (option, index) => `
              <label class="peer-checked:border-yellow-400 block border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-yellow-400 transition-all flex items-center gap-3">
                <input
                  type="radio"
                  name="${inputName}"
                  value="${option}"
                  id="${inputName}-${index}"
                  class="peer hidden"
                />
                <span class="
                  w-5 h-5 inline-block relative border-2 rounded-full border-gray-300 peer-checked:border-yellow-400
                  transition-all duration-200
                ">
                  <span class="
                    absolute top-1/2 left-1/2 bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2 scale-0
                    w-2.5 h-2.5 rounded-full peer-checked:scale-100
                    transition-transform duration-200
                  "></span>
                </span>
                <span class="text-md font-regular text-[#000000]">${option}</span>
              </label>
            `,
          )
          .join('')}
      </form>

      <p id="error-message" class="text-sm text-red-500 mt-2 hidden">*Pilih jawaban sebelum melanjutkan.</p>

      <div class="pt-4 text-center flex justify-between">
        <button
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md shadow transition-all"
          id="prev-button"
        >
          ⬅ Sebelumnya
        </button>
        <button
          class="bg-[#42A7C3] hover:bg-[#2C6F82] text-white font-semibold py-2 px-6 rounded-md shadow transition-all"
          id="next-button"
        >
          Selanjutnya ➡
        </button>
      </div>
    </div>
  `;
}
