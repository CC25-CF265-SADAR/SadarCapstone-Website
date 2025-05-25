import { generateModuleTemplate } from '../../templates/template-module';
import { generateFooterTemplate } from '../../templates/template';

export default class ModuleIntroPage {
  async render() {
    return `
        <section class="flex flex-col items-center mt-12">
            <h1 class="font-semibold text-2xl">Modul Pembelajaran AntiTertipu</h1>
            <h2 class="font-regular text-base text-gray-500 mt-3 mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
            <div class="flex flex-row flex-wrap justify-evenly items-center gap-y-10 mb-15">
                ${generateModuleTemplate({
                  imageSrc: '/images/modules/modul_penipuan.png',
                  link: '#/detail-module-penipuan-online',
                  title: 'Belajar Membedakan Penipuan Online',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                })}
                ${generateModuleTemplate({
                  imageSrc: '/images/modules/modul_phising.png',
                  link: '#/detail-module-penipuan-online',
                  title: 'Modus Phishing',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                })}
                ${generateModuleTemplate({
                  imageSrc: '/images/modules/modul-pharming.png',
                  link: '#/detail-module-penipuan-online',
                  title: 'Modus Pharming',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                })}
                ${generateModuleTemplate({
                  imageSrc: '/images/modules/modul_sniffing.png',
                  link: '#/detail-module-penipuan-online',
                  title: 'Modus Sniffing',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                })}
                ${generateModuleTemplate({
                  imageSrc: '/images/modules/modul_social_engineering.png',
                  link: '#/detail-module-penipuan-online',
                  title: 'Modus Social Engineering',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                })}
                ${generateModuleTemplate({
                  imageSrc: '/images/modules/modul_money_rule.png',
                  link: '#/detail-module-penipuan-online',
                  title: 'Modus Money Rule',
                  description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                })}
            </div>
            ${generateFooterTemplate()}
        </section>
    `;
  }

  async afterRender() {
    //isi disini...
  }
}
