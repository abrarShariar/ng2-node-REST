import { AdminDashboardPage } from './app.po';

describe('admin-dashboard App', function() {
  let page: AdminDashboardPage;

  beforeEach(() => {
    page = new AdminDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
