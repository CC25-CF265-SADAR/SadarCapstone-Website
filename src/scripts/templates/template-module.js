export function generateModuleTemplate({ imageSrc, title, description, link }) {
  return `
    <section class="moduleCard w-80 flex flex-col items-center gap-y-5 justify-items-center text-center max-w-sm p-6 bg-white border border-gray-200 rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
    <section class="moduleDetail card bg-base-100 w-6xl shadow-sm rounded-xl">
      <div class="flex flex-row justify-between items-center pt-7 pb-9 px-12 rounded-xl border-b-2 bg-[#FF6250] text-white border-neutral-100 px-6 py-3 leading-tight dark:border-white/10">
        <article class="w-3xl flex flex-col gap-3">
          <h1 class="text-lg font-semibold">
            AntiTertipu
          </h1>
          <h2 class="text-2xl font-semibold">
            Belajar Membedakan Penipuan Online
          </h2>
          <p class="text-lg font-regular mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div class="flex flex-row items-center mt-2 gap-2">
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
          <div class="w-xl h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div class="h-6 bg-[#FF6250] rounded-full dark:bg-blue-500" style="width: 0%"></div>
          </div>
          <p class="text-lg font-semibold text-[#FF6250]">0%</p>
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
        <section class="videoPlayer flex justify-center">
          <iframe
            class="w-4xl h-[450px] border border-gray-200 rounded-2xl dark:border-gray-700"
            src="https://www.youtube.com/embed/8aRTMQvbODs?si=oKVGKBhVtaloCbmI?rel=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </section>
    `;
}

export function generateModuleSylabusTemplate() {
  return `
        <section class="moduleSylabus mb-10">
          <h2 class="text-lg font-semibold mt-5 py-1 px-5 w-xl bg-[#DFF0F5]">Lorem Ipsum</h2>
          <ul class="text-lg font-regular px-5">
            <li class="flex flex-row content-center items-center self-center gap-4 mt-4">
              <!-- Circular Progress -->
              <div class="relative size-7">
                <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <!-- Background Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="3"></circle>
                  <!-- Progress Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#378BA2] dark:text-blue-500" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"></circle>
                </svg>
              </div>
              <!-- End Circular Progress -->
              <a href="#" class="hover:underline">Lorem Ipsum Sir Dolor Amet</a>
            </li>
            <li class="flex flex-row content-center items-center self-center gap-4 mt-4">
              <!-- Circular Progress -->
              <div class="relative size-7">
                <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <!-- Background Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="3"></circle>
                  <!-- Progress Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#378BA2] dark:text-blue-500" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"></circle>
                </svg>
              </div>
              <!-- End Circular Progress -->
              <a href="#" class="hover:underline">Lorem Ipsum Sir Dolor Amet</a>
            </li>
            <li class="flex flex-row content-center items-center self-center gap-4 mt-4">
              <!-- Circular Progress -->
              <div class="relative size-7">
                <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <!-- Background Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="3"></circle>
                  <!-- Progress Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#378BA2] dark:text-blue-500" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"></circle>
                </svg>
              </div>
              <!-- End Circular Progress -->
              <a href="#" class="hover:underline">Lorem Ipsum Sir Dolor Amet</a>
            </li>
            <li class="flex flex-row content-center items-center self-center gap-4 mt-4">
              <!-- Circular Progress -->
              <div class="relative size-7">
                <svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                  <!-- Background Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="3"></circle>
                  <!-- Progress Circle -->
                  <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-[#378BA2] dark:text-blue-500" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="100" stroke-linecap="round"></circle>
                </svg>
              </div>
              <!-- End Circular Progress -->
              <a href="#" class="hover:underline">Lorem Ipsum Sir Dolor Amet</a>
            </li>
          </ul>
        </section>
    `;
}

export function generateModuleNavbarTemplate(moduleTitle) {
  return `
    <nav class="bg-white shadow-md sticky top-0 z-30">
      <div class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Tombol Back -->
        <button id="backBtn" class="text-white bg-[#42A7C3] hover:bg-[#2C6F82] focus:ring-2 focus:ring-[#2C6F82]/50 focus:outline-none rounded-md w-10 h-10 flex items-center justify-center shadow-sm transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Judul Modul -->
        <h1 class="text-lg font-semibold text-gray-700 truncate max-w-xs sm:max-w-sm md:max-w-md text-center">
          ${moduleTitle}
        </h1>

        <!-- Tombol Sidebar -->
        <button id="toggleSidebar" class="text-2xl text-[#42A7C3] hover:text-[#2C6F82] ring-offset-2 focus:ring-2 focus:ring-[#2C6F82] rounded-md w-10 h-10 flex items-center justify-center transition-all">
          &#9776;
        </button>
      </div>
    </nav>
  `;
}

export function generateModuleSidebarTemplate(module, currentTopicId) {
  const topicItems = module.topics
    .map((topic) => {
      const isActive = topic.id === currentTopicId
        ? `font-semibold text-blue-700 bg-blue-50 rounded-md px-4 py-2 flex items-center justify-between
           shadow-md ring-1 ring-blue-300 scale-105 transition-transform duration-200`
        : `flex items-center justify-between px-4 py-2 rounded cursor-pointer
           hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:shadow-sm
           transition-colors duration-300`;

      const check = topic.checkpoint
        ? `<svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
             <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
           </svg>`
        : `<span class="w-4 h-4 bg-gray-300 rounded-full inline-block flex-shrink-0"></span>`;

      return `
        <li class="${isActive}" tabindex="0" role="button">
          <div class="flex items-center gap-3">
            ${check}
            <span class="text-sm">${topic.title}</span>
          </div>
        </li>
      `;
    })
    .join('');

  return `
    <div class="moduleSidebar bg-white rounded-xl p-5 mt-2 mx-2">
      <h2 class="text-lg font-bold mb-4 border-b border-gray-300 pb-3">Daftar Modul</h2>
      ${generateModuleProgressbarTemplate(module.topics)}
      <ul class="space-y-1 mt-4">${topicItems}</ul>
    </div>
  `;
}

export function generateModuleProgressbarTemplate(topics) {
  const total = topics.length;
  const completed = topics.filter((t) => t.checkpoint).length;
  const percent = Math.floor((completed / total) * 100);

  return `
    <div class="moduleProgressBar mb-3 text-sm text-gray-700 font-semibold flex justify-between items-center">
      <span>${percent}% Selesai</span>
      <span class="text-xs text-gray-500">${completed} dari ${total} topik selesai</span>
    </div>
    <div class="w-full bg-gray-300 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
      <div
        class="h-4 rounded-full transition-all duration-700 ease-in-out"
        style="
          width: ${percent}%;
          background: linear-gradient(90deg, #2C6F82 0%, #42A7C3 70%);
          box-shadow: 0 0 10px #42A7C3;
        "
      ></div>
    </div>
  `;
}

export function generateModuleContentTextTemplate(content) {
  return `
    <article class="moduleContentText prose max-w-none px-20 py-6">
      <h2 class="text-2xl font-bold mb-4">${content.title}</h2>
      <p class="text-base">${content.content}</p>
    </article>
  `;
}

export function generateModuleFooterTemplate(text) {
  return `
    <div class="moduleFooter fixed bottom-0 left-10 right-10 bg-white border-t border-gray-300 px-4 py-3 z-50">
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
    <div class="progressModule w-full max-w-xl md:max-w-[640px] mx-auto mt-6 px-4">
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

export function generateQuizModuleQuestionTemplate({ id, question, options, multiple = false }, selectedAnswers = []) {
  const inputType = multiple ? 'checkbox' : 'radio';
  const inputName = multiple ? `question-${id}[]` : `question-${id}`;

  return `
    <div class="quizModule quiz-container w-full max-w-[600px] mx-auto p-6 space-y-8">
      <h2 class="text-base font-semibold text-[#000000] text-center">${question}</h2>

      <form class="space-y-3 mt-5 mb-8" data-question-id="${id}">
        ${options
          .map(
            (option, index) => `
              <label class="peer-checked:border-yellow-400 block border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-yellow-400 transition-all flex items-center gap-3">
                <input
                type="${inputType}"
                name="${inputName}"
                value="${option}"
                id="${inputName}-${index}"
                class="peer hidden"
                ${selectedAnswers.includes(option) ? 'checked' : ''}
              />
              <span class="
                block w-5 h-5 border-2
                ${multiple ? 'rounded-md' : 'rounded-full'}
                border-gray-300
                peer-checked:border-yellow-400
                relative
              ">
                <span class="
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  ${multiple ? 'w-2 h-2' : 'w-2.5 h-2.5 rounded-full'}
                  bg-yellow-400 scale-0 peer-checked:scale-100
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
        <!-- Tombol Sebelumnya -->
        <button
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md shadow transition-all flex items-center"
            id="prev-button"
          >
          <svg class="w-4 h-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10" aria-hidden="true">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0l4 4M1 5l4-4" />
          </svg>
          <span>Sebelumnya</span>
        </button>

        <!-- Tombol Selanjutnya -->
        <button
          class="bg-[#42A7C3] hover:bg-[#2C6F82] text-white font-semibold py-2 px-6 rounded-md shadow transition-all flex items-center"
            id="next-button"
          >
          <span>Selanjutnya</span>
              <svg class="w-4 h-4 ml-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10" aria-hidden="true">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>
    </div>
  `;
}
