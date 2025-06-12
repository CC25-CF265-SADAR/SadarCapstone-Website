export default class HomePresenter {
  constructor(view) {
    this.view = view;
    this.faqData = [];
  }

  setFAQData(data) {
    this.faqData = data;
  }

  renderFAQ(category) {
    let filtered;
    if (category === 'all') {
      filtered = this.faqData.filter((faq) => faq.category.toLowerCase() === 'semua');
    } else {
      filtered = this.faqData.filter(
        (faq) => faq.category.toLowerCase() === category.toLowerCase(),
      );
    }
    this.view.renderFAQList(filtered);
  }
}
