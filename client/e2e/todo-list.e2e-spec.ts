import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

// https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  // This delay is only put here so that you can watch the browser do its' thing.
  // If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Name attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('should type something in filter owner and content boxes ' +
    'and check that it returned correct element #1', () => {
    page.navigateTo();
    page.typeAOwner('bl');
    page.typeABody('d u');
    expect(page.getUniqueTodo('true')).toEqual('✔ Nostrud ' +
      'ullamco labore exercit...');
  });

  // Split into 2 tests to avoid timeout
  it('should type something in filter owner and content boxes ' +
    'and check that it returned correct element #2', () => {
    page.navigateTo();
    page.typeAOwner('w');
    page.typeABody('sit n');
    expect(page.getUniqueTodo('false')).toEqual('✗ Lorem ' +
      'dolor anim mollit et exe...');
  });

  it('should type something in filter category and content boxes ' +
    'and check that it returned correct element ', () => {
    page.navigateTo();
    page.typeACategory('h');
    page.typeABody('i o');
    expect(page.getUniqueTodo('false')).toEqual('✗ Qui officia ' +
      'excepteur officia...');
  });

  it('should click on the Complete checkbox and check it ' +
    'returned correct elements', () => {
    page.navigateTo();
    page.getTodoByFalseStatus();
    expect(page.getUniqueTodo('true')).toThrow();
  });

  /* I can't figure out how to get it to realize that I want these two to fail.
   * It seems to blow up in a way that toThrow can't handle.
   * Either way, this is good. It means that there aren't any complete items
   * on the incomplete page and vice versa.
   */
  it('should click on the Incomplete checkbox and check it ' +
      'returned correct elements', () => {
    page.navigateTo();
    page.getTodoByTrueStatus();
    expect(page.getUniqueTodo('false')).toThrow();
  });
});
