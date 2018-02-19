import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';
import {Error} from "tslint/lib/error";

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

  it('should click on the status checkboxes and check it ' +
    'returned correct elements', () => {
    page.navigateTo();
    page.getTodoByFalseStatus();
    expect(page.getUniqueTodo('true')).toThrowError('Failed: No element found using ' +
      'locator: By(css selector, *[id="true"])');
    page.getTodoByFalseStatus();
    page.getTodoByTrueStatus();
    expect(page.getUniqueTodo('false')).toThrowError('Failed: No element found using ' +
      'locator: By(css selector, *[id="false"])');
  });
});
