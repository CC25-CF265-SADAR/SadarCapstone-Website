export default class NotFoundPage {
  async render() {
    return `
        <section class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div class="text-center">
                <p class="text-xl font-semibold text-[#42A7C3]">404</p>
                <h1 class="mt-4 text-xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Oops, halaman ini tidak ditemukan</h1>
                <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Pastikan kamu mengakses link yang benar. Jangan sampai tertipu!</p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                <a href="#/" class="rounded-md bg-[#42A7C3] px-8 py-4 text-sm font-semibold text-white shadow-xs hover:bg-[#378BA2] focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-[#42A7C3]">Kembali ke beranda</a>
                </div>
            </div>
        </section>
    `;
  }
}
